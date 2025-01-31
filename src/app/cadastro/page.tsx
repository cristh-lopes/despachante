"use client";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getFirebaseErrorMessage } from "@/utils/errorHandler";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordColor, setPasswordColor] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: 0,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    passwordMatch: true,
  });
  const router = useRouter();

  // Função para validar a força da senha
  const validatePasswordStrength = (password: string) => {
    const lengthValid = password.length;
    const hasNumber = /\d/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasPasswordMatch = password === confirmPassword;

    setPasswordRequirements({
      length: lengthValid,
      uppercase: hasUpperCase,
      lowercase: hasLowerCase,
      number: hasNumber,
      specialChar: hasSpecialChar,
      passwordMatch: hasPasswordMatch,
    });

    return lengthValid >= 8 && hasLowerCase && hasUpperCase && hasNumber
      ? lengthValid >= 12 && hasSpecialChar
        ? { strength: "Forte", color: "green" }
        : { strength: "Moderada", color: "yellow" }
      : { strength: "Fraca", color: "red" };
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validar a força da senha
    const { strength, color } = validatePasswordStrength(password);
    setPasswordStrength(strength);
    setPasswordColor(color);

    if (strength === "Fraca") {
      setError(
        "A senha precisa ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número."
      );
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      router.push("/");
    } catch (error) {
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      await updateProfile(user, { displayName: user.displayName || "" });

      router.push("/");
    } catch (error) {
      setError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-8 py-6 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSignUp} className="mb-4">
        <div className="mb-2">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Senha
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                const { strength, color } = validatePasswordStrength(
                  e.target.value
                );
                setPasswordStrength(strength);
                setPasswordColor(color);
              }}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2"
          >
            Confirmar Senha
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </div>
          <div className="mt-2 h-1 w-full rounded bg-gray-300">
            <div
              className={`h-full rounded ${
                passwordStrength === "Fraca"
                  ? "w-1/12 bg-red-500"
                  : passwordStrength === "Moderada"
                  ? "w-2/3 bg-yellow-500"
                  : "w-full bg-red-500"
              }`}
            />
          </div>
          <p
            className={`mt-1 text-sm ${
              passwordColor === "green"
                ? "text-green-500"
                : passwordColor === "yellow"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {passwordStrength === "Forte"
              ? "Senha forte"
              : passwordStrength === "Moderada"
              ? "Senha moderada"
              : "Senha fraca"}
          </p>

          {/* Exibindo requisitos faltantes */}
          <ul className="mt-2 text-sm">
            {passwordRequirements.length >= 8 ? (
              <li
                className={
                  passwordRequirements.length >= 12
                    ? "text-green-500"
                    : "text-yellow-500"
                }
              >
                • Melhore colocando 12 ou mais caracteres
              </li>
            ) : (
              <li className="text-red-500">• Pelo menos 8 caracteres</li>
            )}
            <li
              className={
                !passwordRequirements.uppercase
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              • Pelo menos uma letra maiúscula
            </li>
            <li
              className={
                !passwordRequirements.lowercase
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              • Pelo menos uma letra minúscula
            </li>
            <li
              className={
                !passwordRequirements.number ? "text-red-500" : "text-green-500"
              }
            >
              • Pelo menos um número
            </li>
            <li
              className={
                !passwordRequirements.specialChar
                  ? "text-yellow-500"
                  : "text-green-500"
              }
            >
              • Pelo menos um caractere especial
            </li>
            <li
              className={
                !passwordRequirements.specialChar
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              • As senhas não coincidem
            </li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Cadastrando..." : "Cadastrar com Email"}
        </button>
      </form>

      <div className="flex items-center mb-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">ou</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <button
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="w-full bg-white text-gray-700 p-2 rounded flex items-center justify-center border border-gray-300 hover:bg-gray-50"
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        {loading ? "Cadastrando..." : "Cadastrar com Google"}
      </button>

      <p className="text-center mt-4">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  );
}
