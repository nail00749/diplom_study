export class ResultTestDto {
  testId: string;
  response: Record<
    string,
    number | number[] | { text: string; isCorrect: boolean }
  >;
}
