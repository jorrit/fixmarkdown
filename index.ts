export default function fixMarkdown(input: string) {
  const symbols = ['~~', '**', '\n'];
  const stack: (string | null)[] = [null, null, null];
  const inputLength = input.length;
  const output = [];

  let inputPosition = 0,
    firstSymbolPosition,
    symbolPosition,
    stackPosition = -1;
  let firstSymbol: string | null;
  let symbol: string | null;
  let stackSlice: (string | null)[] | null;
  let stackSliceString: string | null;

  while (inputPosition < inputLength) {
    firstSymbolPosition = -1;
    firstSymbol = null;
    for (symbol of symbols) {
      symbolPosition = input.indexOf(symbol, inputPosition);
      if (
        symbolPosition !== -1 &&
        (symbolPosition < firstSymbolPosition || firstSymbolPosition === -1)
      ) {
        firstSymbolPosition = symbolPosition;
        firstSymbol = symbol;
      }
    }

    // No more symbols: add output and break.
    if (firstSymbol === null) {
      output.push(input.substring(inputPosition));
      break;
    }

    // New line: fix stack.
    if (firstSymbol === '\n') {
      // No unopened markdown, add all and continue.
      if (stackPosition === -1) {
        output.push(input.substring(inputPosition, firstSymbolPosition + 1));
      } else {
        stackSlice = stack.slice(0, stackPosition + 1);
        stackSliceString = stackSlice.join('');
        stackSlice.reverse();
        output.push(input.substring(inputPosition, firstSymbolPosition));
        output.push(stackSlice.join(''));
        output.push(firstSymbol);
        output.push(stackSliceString);
      }

      inputPosition = firstSymbolPosition + 1;
      continue;
    }

    // Assume markdown is wellformed.
    // If not top of the stack, add to stack
    if (stackPosition === -1 || stack[stackPosition] !== firstSymbol) {
      stack[++stackPosition] = firstSymbol;
    }

    // If top of the stack, remove from stack.
    else {
      --stackPosition;
    }

    output.push(input.substring(inputPosition, firstSymbolPosition + 2));
    inputPosition = firstSymbolPosition + 2;
  }

  return output.join('');
}
