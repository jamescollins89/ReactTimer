console.log('Starting tests...');

function add(a,b){
  return a + b;
}
expect(add(3, 5)).toBe(8);
expect(add(-3,2)).toBeA('number');

function capitaliseWord(word){
  if(!word || typeof word !== 'string') {
    word = '';
  }

  return word.charAt(0).toUpperCase() + word.slice(1);

}
// Give james expect James
// Give james expect typetobe string
// Give nothing expect ''

expect(capitaliseWord("james")).toBe("James");
expect(capitaliseWord("james")).toBeA("string");
expect(capitaliseWord("")).toBe("");

console.log('All test have passed');
