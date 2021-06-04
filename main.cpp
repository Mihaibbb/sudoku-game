#include <iostream>
#include <cmath>
using namespace std;

int main()
{
    float acc, distanta, viteza, viteza_km;
    cout << "Problema miscare rectilinie uniforma\n\n";
    cout << "Pe o pista de curse,autovehiculul circula rectiliniu uniform, iar acesta are o acceleratie constanta, fiind cunoscuta cat si distanta pe care acesta se va deplasa.\n";
    cout << "Acest program va ajuta sa aflati viteza cu care masina se deplaseaza pe pista, stiind ca autovehiculul pleaca de pe loc.\n";
    cout << "Precizari: Scrierea  datelor de la tastatura nu trebuie sa includa si unitatea de masura a datelor din problema.\n\n";
    cout << "Acceleratia masinii(m/s^2):"; cin >> acc;
    cout << "Distanta pe care vehiculul va circula(m):"; cin >> distanta;

    viteza = sqrt(2 * acc * distanta);
    viteza_km = (viteza / 1000) * 3600;
    cout << "Viteza la care automobilul circula dupa pargurgerea de " << distanta << " m este: " << viteza << " m/s /" << viteza_km << " km/h";

    return 0;
}
