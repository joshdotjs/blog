Compile:
  clang main.c
Run:
  ./a.out

Compile (with name):
  clang main.c -o main
Run:
  ./main

Compile (run only pre-processor):
  clang main.c -E
Run:
  ./a.out


Compile (compile into an assembly language file, without linking):
  clang -S main.c
Run:
  ./a.out




-You can generate the object file (.o) with the Clang compiler by using the -c option. 
-This will compile the source code file into an object file but won't link it.
Compile:
  clang -c main.c -o main.o
  // -This command will preprocess, compile, and assemble example.c, 
  //  but it won't link the result. 
  // -The output will be an object file named example.o that contains 
  //  the compiled code in a format that can be linked with other 
  //  object files to create an executable.
Run:
  ./a.out
