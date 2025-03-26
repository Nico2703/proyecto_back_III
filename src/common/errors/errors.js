import { AppError } from "./appError.js";

export class NotFoundError extends AppError {
  constructor(message = "No encontrado") {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Error en la petición") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "No autorizado") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Sin permisos necesarios") {
    super(message, 403);
  }
}
