#include "load_shader.hpp"
#include <fstream>
#include <sstream>
#include <iostream>
#include <stdexcept>

std::string loadShaderSource(const char* filePath)
{
	std::ifstream file(filePath);
	if (!file.is_open())
	{
		throw std::runtime_error(std::string("problems loading shader file ") + filePath);
	}
	std::stringstream buffer;
	buffer << file.rdbuf();
	return buffer.str();
}


GLuint compileShader(const char* filePath, GLenum shaderType)
{
	std::string code = loadShaderSource(filePath);
	const char* codeCStr = code.c_str();

	GLuint shader = glCreateShader(shaderType);
	glShaderSource(shader, 1, &codeCStr, nullptr);
	glCompileShader(shader);

	// TODO: add some error detection here

	return shader;
}


GLuint createShaderProgram(const char* vertexPath, const char* fragmentPath)
{
	GLuint vertexShader = compileShader(vertexPath, GL_VERTEX_SHADER);
	GLuint fragmentShader = compileShader(fragmentPath, GL_FRAGMENT_SHADER);

	GLuint program = glCreateProgram();
	glAttachShader(program, vertexShader);
	glAttachShader(program, fragmentShader);
	glLinkProgram(program);

	// TODO: add some error detection here

	glDeleteShader(vertexShader);
	glDeleteShader(fragmentShader);

	return program;
}

