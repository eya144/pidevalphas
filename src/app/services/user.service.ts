import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inspection, User } from 'src/models/Inspection.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8090/pidev/api/users';

  constructor(private http: HttpClient) {}

  // 🔹 1️⃣ Créer un utilisateur
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/adduser`, user);
  }

  // 🔹 2️⃣ Obtenir tous les inspecteurs
  getAllInspecteurs(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllInspecteurs`);
  }

  // 🔹 3️⃣ Ajouter des inspections à un utilisateur
  addInspectionsToUser(userId: number, inspections: Inspection[], projetId: number): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${userId}/inspections?projetId=${projetId}`, inspections);
  }

  // 🔹 4️⃣ Récupérer tous les utilisateurs
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

  // 🔹 5️⃣ Récupérer un utilisateur par ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getUserById/${id}`);
  }

  // 🔹 6️⃣ Mettre à jour un utilisateur
  updateUser(id: number, userDetails: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update/${id}`, userDetails);
  }

  // 🔹 7️⃣ Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // 🔹 8️⃣ Vérifier si un utilisateur est un architecte
  verifyArchitecte(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verify-architecte/${id}`);
  }
}
