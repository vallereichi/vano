#include "render_triangle.hpp"
#include <stddef.h>

TriangleData setupTriangle(GLuint program, const Vertex* vertices, size_t vertexCount)
{
	TriangleData data;

	glGenBuffers(1, &data.vbo);
	glBindBuffer(GL_ARRAY_BUFFER, data.vbo);
	glBufferData(GL_ARRAY_BUFFER, vertexCount * sizeof(Vertex), vertices, GL_STATIC_DRAW);

	const GLint vpos_location = glGetAttribLocation(program, "vPos");
	const GLint vcol_location = glGetAttribLocation(program, "vCol");

	glGenVertexArrays(1, &data.vao);
	glBindVertexArray(data.vao);

	glEnableVertexAttribArray(vpos_location);
	glVertexAttribPointer(vpos_location, 2, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void*) offsetof(Vertex, pos));

	glEnableVertexAttribArray(vcol_location);
	glVertexAttribPointer(vcol_location, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void*) offsetof(Vertex, col));

	return data;
}


void renderTriangle(GLuint program, GLuint vao, GLint mvp_location, int width, int height)
{
	const float ratio = width / (float) height;

	mat4x4 m, p, mvp;
	mat4x4_identity(m);
	mat4x4_rotate_Z(m, m, (float) glfwGetTime());
	mat4x4_ortho(p, -ratio, ratio, -1.f, 1.f, 1.f, -1.f);
	mat4x4_mul(mvp, p, m);

	glUseProgram(program);
	glUniformMatrix4fv(mvp_location, 1, GL_FALSE, (const GLfloat*) &mvp);
	glBindVertexArray(vao);
	glDrawArrays(GL_TRIANGLES, 0, 3);

}
