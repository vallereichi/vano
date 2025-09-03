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

	// catch errors and prnit error massage on failed compilation
	int parameters = -1;
	glGetShaderiv(shader, GL_COMPILE_STATUS, &parameters);
	if (GL_TRUE != parameters)
	{
		int max_length = 2048, actual_length = 0;
		char log[2048];
		glGetShaderInfoLog(shader, max_length, &actual_length, log);
		fprintf(stderr, "ERROR: Shader index %u did not compile. \n%s\n", shader, log);
		return 1;
	}

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

	// catch errors and prnit error massage on failed compilation
	int parameters = -1;
	glGetProgramiv(program, GL_LINK_STATUS, &parameters);
	if (GL_TRUE != parameters)
	{
		int max_length = 2048, actual_length = 0;
		char log[2048];
		glGetProgramInfoLog(program, max_length, &actual_length, log);
		fprintf(stderr, "ERROR: Could not link shader program GL index %u.\n%s\n", program, log);
		return 1;
	}

	glDeleteShader(vertexShader);
	glDeleteShader(fragmentShader);

	return program;
}

