#include <GLFW/glfw3.h>
#include <stdlib.h>
#include <stdio.h>

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

	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_COMPAT_PROFILE);


	GLFWwindow* window = glfwCreateWindow(640, 480, "Vano-Prototype", NULL, NULL);
	if (!window)
	{
		// Window or OpenGL context creation failed
		glfwTerminate();
		exit(EXIT_FAILURE);
	}

	glfwSetKeyCallback(window, key_callback);


	glfwMakeContextCurrent(window);
	while (!glfwWindowShouldClose(window))
	{
		// Main Render loop
		
		glClear(GL_COLOR_BUFFER_BIT);

		// test if rendering works
		glBegin(GL_TRIANGLES);
		    glColor3f(1.0f, 0.0f, 0.0f); // red
		    glVertex2f(-0.5f, -0.5f);

		    glColor3f(0.0f, 1.0f, 0.0f); // green
		    glVertex2f(0.5f, -0.5f);

		    glColor3f(0.0f, 0.0f, 1.0f); // blue
		    glVertex2f(0.0f, 0.5f);
		glEnd();

		glfwSwapBuffers(window);
		glfwPollEvents();


	}

	glfwDestroyWindow(window);

	glfwTerminate();
	exit(EXIT_SUCCESS);
}
