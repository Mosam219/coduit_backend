export function slugify(title: string): string {
  //title = "this is my first article"
  //return = "this-is-my-first-article"
  let slugifyString = "";
  for (let curr of title.toLowerCase()) {
    if (curr >= "a" && curr <= "z") slugifyString += curr;
    else slugifyString += "-";
  }
  if (slugifyString.length > 30) slugifyString = slugifyString.substring(0, 30);
  return slugifyString;
}
