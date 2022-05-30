import { UnprocessableEntityException } from "@nestjs/common";

export function handleError(error: Error): undefined {
  const errorLines = error.message?.split('\n');
  const lastLineError = errorLines[errorLines.length - 1]?.trim();
  throw new UnprocessableEntityException(
    lastLineError || 'Erro ao tentar executar',
  );
}
