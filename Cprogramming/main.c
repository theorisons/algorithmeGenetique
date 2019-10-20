#include <stdio.h>
#include <stdlib.h>

#include "population.h"

#define MAX_LENGHT_STR 2048

void geneticAlgoritm(char *world, int sizePop, int propEl, int propVal, int propRandom)
{
    int size, nbGeneration, i;

    printf("\n");
    printf("\n");
    printf("Mot a trouver : '");
    for (size = 0; world[size] != '\0'; size++)
    {
        printf("%c", world[size]);
    }
    printf("' de taille %d caracteres\n", size);

    Population population = initPopulation(sizePop, size, propEl, propVal, propRandom);

    nbGeneration = 1;
    firstGeneration(population);
    evaluationPopulation(population, world);
    arrangePopulation(population);

    while (population->ind[0]->fit != 0)
    {
        displayIndividual(population->ind[0], population->sizeInd);
        printf(" _ %d = %d\n", nbGeneration, population->ind[0]->fit);

        nbGeneration += 1;
        evolutionPopulation(population);
        evaluationPopulation(population, world);
        arrangePopulation(population);
    }

    displayIndividual(population->ind[0], population->sizeInd);
    printf(" _ %d = %d\n", nbGeneration, population->ind[0]->fit);

    destroyPopulation(population);
}

void displayParameters(int sizePop, int propEl, int propVal, int propRandom)
{
    printf("Les parametres sont :\n");
    printf("\tNombre d'individus                               : %d \n", sizePop);
    printf("\tPourcentage d'enfants selectionnes via elitisme  : %d \n", propEl);
    printf("\tPourcentage des meilleurs parents selectionnes   : %d \n", propVal);
    printf("\tProbabilite d'obtenir un chromosome aleatoire    : %d \n", propRandom);
}

int main(int argc, char const *argv[])
{
    int play;
    char choice;
    int sizePop = 200;
    int propEl = 100;
    int propVal = 10;
    int propRandom = 5;

    char mot[MAX_LENGHT_STR];

    play = 1;

    while (play)
    {

        printf("\n\n\n");
        printf("*************************************************\n");
        printf("* - Utilitaire textuel d'algorithme genetique - *\n");
        printf("*************************************************\n");
        printf("\n\n\n");

        displayParameters(sizePop, propEl, propVal, propRandom);

        printf("Les commandes sont :\n");
        printf("\t1 - Lancer la simulation\n");
        printf("\t2 - Changer les parametres\n");
        printf("\tAutre - Quitter\n");

        printf("Choix : ");
        scanf("%c", &choice);

        if (choice == '1')
        {
            fgets(mot, MAX_LENGHT_STR, stdin); // clean previous input

            printf("\n\n\n");
            printf("Phrase a decouvrir : ");
            scanf("%[^'\n']s", mot);
            printf("\n\n\n");

            geneticAlgoritm(mot, sizePop, propEl, propVal, propRandom);
            fgets(mot, MAX_LENGHT_STR, stdin); // clean previous input
        }
        else if (choice == '2')
        {
            fgets(mot, MAX_LENGHT_STR, stdin); // clean previous input

            printf("\n\n\n");
            printf("***********************\n");
            printf("* - !! ATTENTION !! - *\n");
            printf("***********************\n");
            printf("\n\n\n");
            printf("La modification des parametres peut faire diverger l'algorithme,\n");
            printf("en d'autre terme le bloquer pour l'eternite !!!!!\n");
            printf("Dans ce cas, il faut ");
            printf("tuer le processus ");
            printf("ou utiliser ");
            printf("CTRL + C\n");

            sizePop = -1;
            while (sizePop < 1)
            {
                printf("Taille de la population (> 0) : ");
                scanf("%d", &sizePop);
                printf("\n");
            }

            propEl = -1;
            while (propEl < 0 || propEl > 100)
            {
                printf("Pourcentage d'enfants selectionnes via elitisme (entre 0 et 100) : ");
                scanf("%dx", &propEl);
                printf("\n");
            }

            propVal = -1;
            while (propVal < 0 || propVal > 100)
            {
                printf("Pourcentage des meilleurs parents selectionnes (entre 0 et 100) : ");
                scanf("%d", &propVal);
                printf("\n");
            }

            propRandom = -1;
            while (propRandom < 0 || propRandom > 100)
            {
                printf("Probabilite (en poucentage) d'obtenir un chromosome aleatoire (entre 0 et 100) : ");
                scanf("%d", &propRandom);
                printf("\n");
            }

            fgets(mot, MAX_LENGHT_STR, stdin); // clean previous input
        }
        else
        {
            play = 0;
        }
    }

    printf("\n\n\n");
    printf("****************************************************************\n");
    printf("* - Copyright - Theorisons 2019 : www.youtube.com/theorisons - *\n");
    printf("****************************************************************\n");
    return 0;
}
