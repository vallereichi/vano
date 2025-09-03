#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <stdlib.h>
#include <stdio.h>
#include <stddef.h>
#include <iostream>

#include "linmath.h"
#include "../util/load_shader.hpp"
#include "../render/render_triangle.hpp"



static const Vertex triangle1_vertices[3] =
{
	{{-0.6f, -0.4f}, {1.f, 0.f, 0.f}},
	{{ 0.6f, -0.4f}, {0.f, 1.f, 0.f}},
	{{  0.f,  0.6f}, {0.f, 0.f, 1.f}}
};

static const Vertex triangle2_vertices[3] =
{
	{{ 0.7f,  0.9f}, {1.f, 0.f, 0.f}},
	{{ 0.9f,  0.7f}, {0.f, 1.f, 0.f}},
	{{ 0.5f,  0.7f}, {0.f, 0.f, 1.f}}
};


static void error_callback(int error, const char* description)
{
	fprintf(stderr, "Error: %s\n", description);
}

static void key_callback(GLFWwindow* window, int key, int scancode, int action, int mods)
{
	if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS)
		glfwSetWindowShouldClose(window, GLFW_TRUE);
}

int main()
{
	glfwSetErrorCallback(error_callback);
	if (!glfwInit())
		exit(EXIT_FAILURE);

	glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);


	GLFWwindow* window = glfwCreateWindow(640, 480, "Vano-Prototype", NULL, NULL);
	if (!window)
	{
		// Window or OpenGL context creation failed
		glfwTerminate();
		exit(EXIT_FAILURE);
	}

	glfwSetKeyCallback(window, key_callback);


	glfwMakeContextCurrent(window);
	if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
	{
	    std::cerr << "Failed to initialize GLAD" << std::endl;
	    return -1;
	}

	// print out version number and system information
	std::cout << "OpenGL version: " << glGetString(GL_VERSION) << std::endl;
	std::cout << "GLSL version:   " << glGetString(GL_SHADING_LANGUAGE_VERSION) << std::endl;
	std::cout << "Renderer:       " << glGetString(GL_RENDERER) << std::endl;
	std::cout << "Vendor:         " << glGetString(GL_VENDOR) << std::endl;


	glfwSwapInterval(1);
	

	// load shaders and link them into program
	std::string vertexPath = std::string(SHADER_DIR) + "/vertex.glsl";
	std::string fragmentPath = std::string(SHADER_DIR) + "/fragment.glsl";
	GLuint program = createShaderProgram(vertexPath.c_str(), fragmentPath.c_str());
	GLint mvp_location = glGetUniformLocation(program, "MVP");

	// setup everything that will be  drawn in the render loop
	TriangleData triangle1 = setupTriangle(program, triangle1_vertices, 3);
	TriangleData triangle2 = setupTriangle(program, triangle2_vertices, 3);


	while (!glfwWindowShouldClose(window))
	{
		// Main Render loop
		int width, height;
		glfwGetFramebufferSize(window, &width, &height);
		
		glViewport(0, 0, width, height);
		glClearColor(0.2f, 0.2f, 0.2f, 1.f);
		glClear(GL_COLOR_BUFFER_BIT);

		
		renderTriangle(program, triangle1.vao, mvp_location, width, height);
		renderTriangle(program, triangle2.vao, mvp_location, width, height);

		glfwSwapBuffers(window);
		glfwPollEvents();


	}

	glfwDestroyWindow(window);

	glfwTerminate();
	exit(EXIT_SUCCESS);
}
