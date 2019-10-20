#include "individual.h"

typedef struct
{
    Individual *ind;
    int sizePop;
    int sizeInd;
    int nbElit;
    int indPick;
    int propRandomChro;

} * Population;

Population initPopulation(int sizePopulation, int sizeIndividual, int propElite, int selectionElite, int propRandomChro);

void firstGeneration(Population pop);

static int compare(void const *valA, void const *valB);
void arrangePopulation(Population pop);
void evolutionPopulation(Population pop);

void evaluationPopulation(Population pop, char *worldTargeted);

void displayPopulation(Population pop);

void destroyPopulation(Population pop);
