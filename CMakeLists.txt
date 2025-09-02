cmake_minimum_required(VERSION 3.10)
project(VanoPrototype)

# C++ Standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Include-Verzeichnisse
include_directories(include)

# Quellcode
set(SOURCES
    src/glfw-prototype/prototype.cpp
    deps/glad/src/glad.c
)

# Executable erzeugen
add_executable(VanoPrototype ${SOURCES})

# GLFW über pkg-config finden
find_package(PkgConfig REQUIRED)
pkg_search_module(GLFW REQUIRED glfw3)

# Include- und Library-Verzeichnisse setzen
target_include_directories(VanoPrototype PRIVATE 
	${GLFW_INCLUDE_DIRS}
	${CMAKE_SOURCE_DIR}/deps/glad/include
)
target_link_directories(VanoPrototype PRIVATE ${GLFW_LIBRARY_DIRS})

# GLFW und weitere Libraries linken
target_link_libraries(VanoPrototype ${GLFW_LIBRARIES} "-framework OpenGL")

