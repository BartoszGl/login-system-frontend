# LoginSystemFrontend

W celu uruchomienia wykonać:

npm install

ng serve

System został napisany z użyciem Angular.

Główne zabezpieczenia znajdują się w app/shared/guard oraz app/shared/interceptors

Główną specyfiką systemu jest to, że przy logowaniu użytkownika wydawany jest 
JWT, przy każdej zmianie route z powodu bezpieczeństwa system pyta backend o dane dotyczące użytkownika - 
jego email, uprawnienia, to czy jest zweryfikowany czy nie. Dzieje się tak, ponieważ niestety są specjalne programy do modyfikowania 
local storage, weryfikując tożsamość użytkownika przy każdej zmianie route, mam pewność, że jest on zawsze tym za kogo się podaje

W przypadku gdy user jest adminem w widoku /profile pojawia się link do CMS, sam link do cms to /admin
Konto admina nie może zostać utworzone z widoku /register.

