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
	glfwWindowHint(GLFW_SAMPLES, 8);

	// get monitor resolution and set window dimensions in pixels
	bool full_screen = false;

	GLFWmonitor* mon = NULL;
	int win_width = 800, win_height = 600;

	if (full_screen)
	{
		mon = glfwGetPrimaryMonitor();
		const GLFWvidmode* mode = glfwGetVideoMode(mon);

		glfwWindowHint(GLFW_RED_BITS, mode->redBits);
		glfwWindowHint(GLFW_GREEN_BITS, mode->greenBits);
		glfwWindowHint(GLFW_BLUE_BITS, mode->blueBits);
		glfwWindowHint(GLFW_REFRESH_RATE, mode->refreshRate);

		win_width = mode->width;
		win_height = mode->height;
	}


	GLFWwindow* window = glfwCreateWindow(win_width, win_height, "Vano-Prototype", NULL, NULL);
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

	// set the refresh rate to the refrsh rate of the monitor (0 for immediate swap)
	glfwSwapInterval(1);
	

	// load shaders and link them into program
	std::string vertexPath = std::string(SHADER_DIR) + "/vertex.glsl";
	std::string fragmentPath = std::string(SHADER_DIR) + "/fragment.glsl";
	GLuint program = createShaderProgram(vertexPath.c_str(), fragmentPath.c_str());
	GLint mvp_location = glGetUniformLocation(program, "MVP");

	// setup everything that will be  drawn in the render loop
	TriangleData triangle1 = setupTriangle(program, triangle1_vertices, 3);
	TriangleData triangle2 = setupTriangle(program, triangle2_vertices, 3);

	// set up a FPS counter
	double prev_time = glfwGetTime();
	double delay_countdown = 0.1;


	while (!glfwWindowShouldClose(window))
	{
		// update the FPS counter
		double curr_time = glfwGetTime();
		double elapsed_time = curr_time - prev_time;
		prev_time = curr_time;
		delay_countdown -= elapsed_time;
		if (delay_countdown <= 0.0 && elapsed_time > 0.0)
		{
			double fps = 1.0 / elapsed_time;

			char tmp[256];
			sprintf(tmp, "FPS %.2lf", fps);
			glfwSetWindowTitle(window, tmp);
			delay_countdown = 0.1;
		}


		// Main Render loop
		int width, height;
		glfwGetWindowSize(window, &width, &height);
		
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
