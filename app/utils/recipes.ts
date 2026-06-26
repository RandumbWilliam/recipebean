import type { RecipeInstruction } from '~~/shared/schemas/recipes'

export function withInstructionSteps(instructions: RecipeInstruction[]) {
  let step = 0
  return instructions.map((instruction, index) =>
    instruction.type === 'header'
      ? { instruction, step: null as number | null, index }
      : { instruction, step: ++step, index },
  )
}
