cmake_minimum_required(VERSION 3.10)
project(Vano)

# C++ Standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# set the runtime output directory
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin)

# set up a definition for the shader directory
add_definitions(-DSHADER_DIR="${CMAKE_SOURCE_DIR}/src/shaders")

# source code
set(SOURCES
    src/glfw-prototype/prototype.cpp
    src/util/load_shader.cpp
    src/render/render_triangle.cpp
    deps/glad/src/glad.c
)

# create executables
add_executable(Vano ${SOURCES})

# set up include and library directories
target_include_directories(Vano PRIVATE 
	${CMAKE_SOURCE_DIR}/deps/glad/include
	${CMAKE_SOURCE_DIR}/include
)

# build GLFW from /deps
set(GLFW_BUILD_DOCS OFF CACHE BOOL "GLFW lib only")
set(GLFW_BUILD_TESTS OFF CACHE BOOL "GLFW lib only")
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "GLFW lib only")
add_subdirectory(deps/glfw)

target_link_libraries(Vano glfw)

# set platform specific OpenGL libs
if(APPLE)
    target_compile_definitions(Vano PRIVATE GL_SILENCE_DEPRECATION)
    target_link_libraries(Vano "-framework OpenGL")
elseif(WIN32)
    target_link_libraries(Vano opengl32)
else() # Linux
    target_link_libraries(Vano GL)
endif()


