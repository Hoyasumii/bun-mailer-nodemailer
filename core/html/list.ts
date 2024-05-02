export const list = (ordered: boolean, ...data: Array<string>) => {
  const listItens: Array<string> = data.map(item => `<li>${item}</li>`);
  const tag = ordered ? "ol" : "ul";
  return `<${tag}>${listItens.join("")}</${tag}>`
}