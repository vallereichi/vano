#pragma once
#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include "linmath.h"

struct TriangleData
{
	GLuint vao;
	GLuint vbo;
};

struct Vertex
{
	vec2 pos;
	vec3 col;
};

TriangleData setupTriangle(GLuint program, const Vertex* vertices, size_t vertexCount);
void renderTriangle(GLuint program, GLuint vao, GLint mvp_location, int width, int height);


