import Recipe from './Recipe';
import User from './User';  

(async () => {
  const recipe = await Recipe.findOne({
    where: { userId: 2 },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['userId'] } },
    ],
  });
  console.log(recipe);
  process.exit(0);
})();