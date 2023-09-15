import prisma from '../lib/prisma';

async function main() {
  await prisma.heroes.createMany({
    data: [
      {
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription: 'He was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton\'s destruction...',
        superpowers: [
          'Solar energy absorption and healing factor',
          'Solar flare and heat vision',
          'Solar invulnerability',
          'Flight'
        ],
        catchPhrase: 'Look, up in the sky, it\'s a bird, it\'s a plane, it\'s Superman!',
        images: [
          'https://static.wikia.nocookie.net/marvel_dc/images/a/a5/Superman_Vol_5_1_Textless.jpg/revision/latest/scale-to-width-down/1200?cb=20180711061148',
          'https://149455152.v2.pressablecdn.com/wp-content/uploads/2023/02/Superman-1-1.jpg'
        ]
      },
      {
        nickname: 'Spider-Man',
        realName: 'Peter Parker',
        originDescription: 'Peter Parker was bitten by a radioactive spider, granting him spider-like abilities.',
        superpowers: [
          'Wall-crawling',
          'Enhanced strength and agility',
          'Spider-sense (precognitive danger detection)'
        ],
        catchPhrase: 'With great power comes great responsibility.',
        images: [
          'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
          'https://donttellharrycom.files.wordpress.com/2021/03/list-of-important-spider-man-comics.jpg?w=600'
        ]
      },
      {
        nickname: 'Wonder Woman',
        realName: 'Diana Prince',
        originDescription: 'Diana Prince is an Amazon princess with divine powers given by the gods of Olympus.',
        superpowers: [
          'Superhuman strength and durability',
          'Flight',
          'Lasso of Truth (compels truthfulness)',
          'Bracelets of Submission (deflects projectiles)'
        ],
        catchPhrase: 'Aphrodite, give me strength.',
        images: [
          'https://media.wired.com/photos/59375820fbdfa3763bab97ae/master/w_2560%2Cc_limit/GalleryComics_1920x1080_20170531_WW-Annual-1_5903bbd4d223b6.50778583TA.jpg',
          'https://deadline.com/wp-content/uploads/2019/10/screen-shot-2019-10-17-at-8.11.00-pm.png?w=681&h=383&crop=1'
        ]
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
