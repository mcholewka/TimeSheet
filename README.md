# TimeSheet
Projekt studencki z przedmiotu Aplikacje Internetowe

Temat:

Aplikacja do raportowania czasu pracy.

Technologie:
- Angular
- Node.js (v14.17.6), Express.js
- Baza danych MongoDB

Uruchomienie:

a) server

Znajdując się w folderze Timesheet-server należy najpierw zainstalować wymagane paczki - polecenie npm install,
następnie serwer może być uruchomiony przy użyciu komendy node app.js

b) webapp (UI)

Znajdując się w folderze Timesheet-webapp należy najpierw zainstalować wymagane paczki - polecenie npm install,
następnie aplikacja może być uruchomiona przy użyciu komendy ng serve

c) po uruchomieniu obu modułów aplikacja domyślnie będzie dostępna pod adresem -  http://localhost:4200/

Testowy użytkownik:
Email: user@mail.com
Hasło: Welcome12345!

Funkcjonalność:

- Logowanie/ Rejestracja użytkownika
- Prezentacja instiejących wpisów w formie tabeli
- Paginacja danych tabeli
- Filtrowanie tabeli na podstawie: nazwy projektu, zadania, dat z przedziału
- Dodawanie, edycja, usuwanie wpisów
- Wykres słupkowy prezentujący podsumowanie ilości przepracowanych godzin w skali miesiąca
  
