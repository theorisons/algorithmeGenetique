#include <stdio.h>
#include <stdlib.h>

#include "individual.h"
#include "utilities.h"

Individual initIndividual(int sizeChromosomes)
{
    Individual newInd = malloc(sizeof(*newInd));
    if (newInd == NULL)
    {
        printf("Plus assez d'espace memoire disponible\n");
        printf("Allocation Individu Impossible\n");
    }

    newInd->chromosomes = malloc(sizeChromosomes * sizeof(*newInd->chromosomes));
    if (newInd->chromosomes == NULL)
    {
        printf("Plus assez d'espace memoire disponible\n");
        printf("Allocation Chromosomes Impossible\n");
    }

    newInd->fit = -1;

    return (newInd);
}

char randomPickChar()
{
    if (NB_ELMTS > 1)
    {
        return (caracts[rand() % (NB_ELMTS - 1)]);
    }
    return (caracts[0]);
}

void generatedChromosomes(Individual ind, int size)
{
    int i;

    for (i = 0; i < size; i++)
    {
        ind->chromosomes[i] = randomPickChar();
    }
}

void createNewChromosomes(Individual ind, char *valueP1, char *valueP2, int size, int p)
{
    /*
    50 % are chromosomes from parent 1
    50 % are chromosomes from parent 2
    percentage p to choose randomly
    */

    int i;
    int prob;

    for (i = 0; i < size; i++)
    {
        prob = 1 + (rand() % 100);

        if (prob <= p)
        {
            ind->chromosomes[i] = randomPickChar();
        }
        else
        {
            if (i < size / 2)
            {
                ind->chromosomes[i] = valueP1[i];
            }
            else
            {
                ind->chromosomes[i] = valueP2[i];
            }
        }
    }
}

void evaluationInd(Individual ind, int size, char *worldTargeted)
{
    int i;
    ind->fit = 0;

    for (i = 0; i < size; i++)
    {
        if (ind->chromosomes[i] != worldTargeted[i])
        {
            ind->fit += 1;
        }
    }
}

void displayIndividual(Individual ind, int size)
{
    int i;

    if (ind != NULL)
    {
        for (i = 0; i < size; i++)
        {
            printf("%c", ind->chromosomes[i]);
        }
    }
}

void destroyIndividual(Individual ind)
{
    if (ind != NULL)
    {
        free(ind->chromosomes);
        free(ind);
    }
}
