cmake_minimum_required(VERSION 3.10)
project(Vano)

# C++ Standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# source code
set(SOURCES
    src/glfw-prototype/prototype.cpp
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


