#pragma once
#include <glad/glad.h>
#include <string>

std::string loadShaderSource(const char* filePath);

GLuint compileShader(const char* filePath, GLenum shaderType);

GLuint createShaderProgram(const char* vertexPath, const char* fragmentPath);
