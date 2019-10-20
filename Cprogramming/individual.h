typedef struct
{
    char *chromosomes;
    int fit;
} * Individual;

Individual initIndividual(int sizeChromosomes);

char randomPickChar();
void generatedChromosomes(Individual ind, int size);
void createNewChromosomes(Individual ind, char *valueP1, char *valueP2, int size, int p);

void evaluationInd(Individual ind, int size, char *worldTargeted);

void displayIndividual(Individual ind, int size);

void destroyIndividual(Individual ind);
