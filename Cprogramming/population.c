#include <stdio.h>
#include <stdlib.h>

#include "population.h"

Population initPopulation(int sizePopulation, int sizeIndividual, int propElite, int selectionElite, int propRandomChro)
{
    Population newPop = malloc(sizeof(*newPop));
    if (newPop == NULL)
    {
        printf("Plus assez d'espace memoire disponible\n");
        printf("Allocation Population Impossible\n");
        return (NULL);
    }

    newPop->sizePop = sizePopulation;
    newPop->sizeInd = sizeIndividual;
    newPop->nbElit = newPop->sizePop * propElite / 100;
    newPop->indPick = newPop->sizePop * selectionElite / 100;
    newPop->propRandomChro = propRandomChro;

    newPop->ind = malloc(newPop->sizePop * sizeof(*newPop->ind));
    if (newPop->ind == NULL)
    {
        printf("Plus assez d'espace memoire disponible\n");
        printf("Allocation Tableau Individus Impossible\n");
        return (NULL);
    }

    return (newPop);
}

void firstGeneration(Population pop)
{
    int i;

    for (i = 0; i < pop->sizePop; i++)
    {
        pop->ind[i] = initIndividual(pop->sizeInd);
        generatedChromosomes(pop->ind[i], pop->sizeInd);
    }
}

static int compare(void const *valA, void const *valB)
{
    /* Compare pour trie croissant */
    Individual const *pA = valA;
    Individual const *pB = valB;

    return (*pA)->fit - (*pB)->fit;
}

void arrangePopulation(Population pop)
{
    qsort(pop->ind, pop->sizePop, sizeof(*pop->ind), compare);
}

void evolutionPopulation(Population pop)
{
    // propElitism % are generated with randomly with the propValue % of the best fitness
    // (100 - propElitism) % are choose randomly

    int i, v;

    int indexP1 = 0;
    int indexP2 = 0;

    /* Copy of all chromosomes */
    char **cpyChromosomes = malloc(pop->sizePop * sizeof(*cpyChromosomes));
    for (i = 0; i < pop->sizePop; i++)
    {
        cpyChromosomes[i] = malloc(pop->sizeInd * sizeof(*cpyChromosomes[i]));
        for (v = 0; v < pop->sizeInd; v++)
        {
            cpyChromosomes[i][v] = pop->ind[i]->chromosomes[v];
        }
    }

    /* Generation of children based on the best fitness */
    for (i = 0; i < pop->nbElit; i++)
    {
        if (pop->indPick != 0)
        {
            indexP1 = rand() % pop->indPick;
            indexP2 = rand() % pop->indPick;
        }
        createNewChromosomes(pop->ind[i], cpyChromosomes[indexP1], cpyChromosomes[indexP2], pop->sizeInd, pop->propRandomChro);
    }

    /* Generation of children based on random parents */
    for (; i < pop->sizePop; i++)
    {
        indexP1 = rand() % pop->sizePop;
        indexP2 = rand() % pop->sizePop;
        createNewChromosomes(pop->ind[i], cpyChromosomes[indexP1], cpyChromosomes[indexP2], pop->sizeInd, pop->propRandomChro);
    }

    for (i = 0; i < pop->sizePop; i++)
    {
        free(cpyChromosomes[i]);
    }
    free(cpyChromosomes);
}

void evaluationPopulation(Population pop, char *worldTargeted)
{
    int i;

    for (i = 0; i < pop->sizePop; i++)
    {
        evaluationInd(pop->ind[i], pop->sizeInd, worldTargeted);
    }
}

void displayPopulation(Population pop)
{
    int i;

    if (pop != NULL)
    {
        for (i = 0; i < pop->sizePop; i++)
        {
            displayIndividual(pop->ind[i], pop->sizeInd);
            printf(" _ %d FIT %d\n", i, pop->ind[i]->fit);
        }
    }
}

void destroyPopulation(Population pop)
{
    int i;

    if (pop != NULL)
    {
        for (i = 0; i < pop->sizePop; i++)
        {
            destroyIndividual(pop->ind[i]);
        }

        free(pop->ind);
        free(pop);
    }
}