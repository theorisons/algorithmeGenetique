all:
	make linux
	make windows
	make cleanBinary

linux: main.o individual.o population.o 
	gcc main.c individual.c population.c -o executable/executableLinux -lm

windows: main.o individual.o population.o 
	i686-w64-mingw32-gcc main.c individual.c population.c -o executable/executableWindows.exe -lm

cleanBinary:
	rm *.o

clean:
	rm *.o executable/*