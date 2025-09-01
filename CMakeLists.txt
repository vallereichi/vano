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
)

# Executable erzeugen
add_executable(VanoPrototype ${SOURCES})

# GLFW über pkg-config finden
find_package(PkgConfig REQUIRED)
pkg_search_module(GLFW REQUIRED glfw3)

# GLFW und weitere Libraries linken
target_link_libraries(VanoPrototype ${GLFW_LIBRARIES} GL dl pthread)

