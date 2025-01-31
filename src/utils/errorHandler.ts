import { FirebaseError } from "firebase/app";

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    console.log(error)
    switch (error.code) {
      case "auth/invalid-email":
        return "O email fornecido é inválido.";
      case "auth/user-disabled":
        return "Esta conta foi desativada.";
      case "auth/user-not-found":
        return "Não há usuário correspondente a este email.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      case "auth/email-already-in-use":
        return "Este email já está em uso.";
      case "auth/weak-password":
        return "A senha é muito fraca. Use pelo menos 6 caracteres.";
      default:
        return "Ocorreu um erro inesperado. Tente novamente.";
    }
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}
