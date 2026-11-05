export const PRODUCT_OVERRIDES = {
  '30ml-frosted-glass-fnd-bottle-black-pump': {
    images: ['https://dev.javedtraders.shop/30ml-frosted-glass-bottle.png'],
    desc: '<p>30ml square frosted glass bottle with a black pump and a matching square black cap. Suitable for oils, lotions and creams.</p>',
  },
  'glass-bottles-30-ml-fnd-wiht-pump': {
    images: [
      'https://dev.javedtraders.shop/30ml-frosted-glass-foundation-pump-bottle.png',
      'https://dev.javedtraders.shop/30ml-frosted-glass-foundation-pump-bottle-2.png',
      'https://dev.javedtraders.shop/30ml-frosted-glass-foundation-pump-bottle-3.png',
      'https://dev.javedtraders.shop/30ml-frosted-glass-foundation-pump-bottle-4.png',
      'https://dev.javedtraders.shop/30ml-frosted-glass-foundation-pump-bottle-5.png',
    ],
    desc: '<p>30ml round frosted glass bottle with a pump and clear overcap, available with a white or black pump. For foundation, serums, lotions and primers.</p>',
  },
}

const listedProduct = (number, slug, title, imageNames, description, cats) => ({
  id: `jt-listed-${String(number).padStart(2, '0')}`,
  slug,
  title,
  price: 0,
  cats,
  images: imageNames.map((name) => `https://dev.javedtraders.shop/${name}`),
  desc: `<p>${description}</p>`,
})

export const PRODUCT_ADDITIONS = [
  listedProduct(
    1,
    'premium-airless-bottle-50ml',
    'Premium Airless Bottle 50ml',
    ['premium-airless-bottle.png'],
    'White 50ml airless pump bottle with a clear cap. The airless pump dispenses smoothly and helps keep serums, lotions and creams fresh. Compact and easy to carry.',
    ['airless-bottle']
  ),
  listedProduct(
    2,
    'premium-widemouth-airless-bottle-50ml',
    'Premium Widemouth Airless Bottle 50ml',
    ['preminum-widemouth-airless-bottle.png'],
    'White 50ml airless bottle with a wide opening that makes filling and cleaning easier. A good fit for thicker creams, gels and lotions.',
    ['airless-bottle']
  ),
  listedProduct(
    3,
    'golden-ring-airless-bottle-30ml',
    'Golden Ring Airless Bottle 30ml',
    ['golden-ring-airless-bottle.png'],
    '30ml white airless bottle with a gold ring accent and a matching cap. A neat, upscale look for serums, lotions, creams and essences.',
    ['airless-bottle']
  ),
  listedProduct(
    4,
    'premium-airless-acrylic-bottles-30ml-50ml',
    'Premium Airless Acrylic Bottles 30ml & 50ml',
    ['premium-airless-acrylic-bottles.png'],
    'Clear acrylic airless bottles in 30ml and 50ml with a white pump, silver band and white base. Suited to serums, lotions and creams.',
    ['airless-bottle']
  ),
  listedProduct(
    7,
    'premium-foundation-pump-bottles-30ml-50ml',
    'Premium Foundation Pump Bottles 30ml & 50ml',
    ['premium-foundation-pump-bottles.png'],
    'Frosted glass pump bottles in 30ml and 50ml with black or grey pumps and clear overcaps. For foundation, BB cream, serums and moisturizers.',
    ['serum-bottel']
  ),
  listedProduct(
    8,
    '300ml-feeder-bottle-lotion-pump',
    '300ml Feeder Bottle with Lotion Pump',
    [
      '300ml-feeder-bottles.png',
      '300ml-feeder-bottles-2.png',
      '300ml-feeder-bottles-3.png',
      '300ml-feeder-bottles-4.png',
      '300ml-feeder-bottles-5.png',
    ],
    '300ml glossy bottles in black and white with a lotion pump (the white one has a gold collar). For lotions, creams, shampoos, conditioners and body wash. Suited to salons, spas and home use.',
    ['oil-shampoo']
  ),
  listedProduct(
    9,
    'premium-lotion-bottles-100ml-300ml',
    'Premium Lotion Bottles 100ml – 300ml',
    ['lotion-bottle.png', 'lotion-bottle-2.png', 'lotion-bottle-3.png', 'lotion-bottle-4.png'],
    'Clear bottles in 100ml, 200ml and 300ml with a white lotion pump and gold collar. For lotions, creams, serums and body lotions.',
    ['oil-shampoo']
  ),
  listedProduct(
    10,
    'premium-lotion-bottle-press-cap-200ml',
    'Premium Lotion Bottle with Press Cap 200ml',
    ['premium-lotion-bottle-with-presscap.png'],
    '200ml bottle with a press (disc-top) cap, in white, clear and black, with gold or silver caps. For lotions, toners, shampoos, hand wash and oils.',
    ['oil-shampoo']
  ),
  listedProduct(
    11,
    'premium-acrylic-pump-bottles',
    'Premium Acrylic Pump Bottles',
    ['acrylic-prenium-pump-bottle.png'],
    'Clear acrylic pump bottles with a gold or white-silver pump. Sizes: 100ml, 150ml and 200ml (the photo also shows a 120ml). For lotions, creams, serums and hand wash.',
    ['oil-shampoo']
  ),
  listedProduct(
    12,
    'fancy-mist-pump-bottle-100ml',
    'Fancy Mist Pump Bottle 100ml',
    ['clear-mist-spray-bottle.png'],
    '100ml clear bottle with a black fine-mist pump and a clear cap. For toners, face mists, rose water and other liquids.',
    ['oil-shampoo']
  ),
  listedProduct(
    13,
    'nozzle-bottles-50ml-100ml',
    'Nozzle Bottles 50ml & 100ml',
    ['nozzel-bottles.png'],
    'Frosted bottles in 50ml and 100ml with a white spray pump and a long nozzle. For toners, hair mists, sanitizers and skincare liquids.',
    ['oil-shampoo']
  ),
  listedProduct(
    14,
    'oil-nozzle-cap-bottles-100ml-200ml',
    'Oil Nozzle Cap Bottles 100ml & 200ml',
    ['oil-nozzel-cap-bottle.png'],
    'Bottles in 100ml and 200ml with a twist-open nozzle cap, in black, clear and white. For oils, serums, tinctures and other liquids that need controlled pouring.',
    ['oil-shampoo']
  ),
  listedProduct(
    15,
    'premium-toner-bottles-100ml',
    'Premium Toner Bottles 100ml',
    ['Premium-toner-bottles.png'],
    '100ml frosted bottle with a white screw cap and an inner stopper. For toners, mists, essences and micellar water.',
    ['oil-shampoo']
  ),
  listedProduct(
    16,
    'silver-golden-serum-bottles-20ml-30ml',
    'Silver & Golden Serum Bottles 20ml & 30ml',
    ['silver-and-gold-serum-bottle.png'],
    'Glass serum bottles in 20ml and 30ml with a shiny silver or gold finish and a dropper. For serums, oils and lotions.',
    ['serum-bottel']
  ),
  listedProduct(
    17,
    'serum-bottles-20ml',
    '20ml Serum Bottles',
    ['serum-bottles-20ml.png'],
    '20ml glass serum bottles in white, black, amber and frosted glass, with gold, silver or black collars. For serums, facial oils, beard oils and hair oils.',
    ['serum-bottel']
  ),
  listedProduct(
    18,
    'white-shine-premium-serum-bottles-20ml-30ml',
    'White Shine Premium Serum Bottles 20ml & 30ml',
    ['white-shine-preninium-serum-bottles.png'],
    'Glossy white glass serum bottles in 20ml and 30ml with a white dropper and silver collar. For serums, essential oils and skincare.',
    ['serum-bottel']
  ),
  listedProduct(
    19,
    'coloured-flat-head-serum-bottles-30ml',
    'Coloured Flat Head Serum Bottles 30ml',
    ['coloured-flat-head-serum-bottles.png'],
    '30ml flat head dropper bottles in black, mint green, pink, aqua blue and white. For serums, essential oils and skincare.',
    ['serum-bottel']
  ),
  listedProduct(
    20,
    'premium-roll-on-bottle-10ml',
    'Premium Roll On Bottle 10ml',
    ['premium-roll-on-bottles.png'],
    '10ml amber glass roll-on bottle with a roller ball and a black cap. For essential oils, attars, perfumes and serums. The photo also shows amber dropper versions.',
    ['serum-bottel']
  ),
  listedProduct(
    21,
    'eye-roller-bottle-10ml',
    'Eye Roller Bottle 10ml',
    ['refresh-revive-radiate.png'],
    '10ml eye roller bottle in silver and gold finish with a stainless steel roller ball and a clear cap. For eye serums, oils and essentials.',
    ['serum-bottel']
  ),
  listedProduct(
    22,
    'frosted-candle-jar-200gm',
    'Frosted Candle Jar 200gm',
    ['frosted-glass-candle-on-marble.png'],
    '200gm frosted glass jar with a silver metal lid. For soy, paraffin and gel candles, home décor and gifting.',
    ['cream-jar']
  ),
  listedProduct(
    23,
    'pet-jars-150ml-200ml-250ml',
    'PET Jars 150ml, 200ml & 250ml',
    [
      'three-clourful-scrub-1.png',
      'three-clourful-scrub-2.png',
      'three-clourful-scrub-3.png',
      'three-clourful-scrub-4.png',
      'three-clourful-scrub-5.png',
    ],
    'Clear wide-mouth PET jars in 150ml, 200ml and 250ml with silver screw lids. For body scrubs, creams, gels, butters and hair masks.',
    ['cream-jar']
  ),
  listedProduct(
    24,
    'black-aluminium-tins-10gm-30gm',
    'Black Aluminium Tins 10gm & 30gm',
    ['black-aluminium-tins.png'],
    'Matte black aluminium tins in 10gm and 30gm with screw lids. For lip balms, salves, creams and solid perfumes.',
    ['cream-jar']
  ),
  listedProduct(
    25,
    'premium-majoon-jar-100gm-frosted-plastic',
    'Premium Majoon Jar 100gm (frosted plastic)',
    ['premium-majoon-jars.png'],
    '100gm frosted plastic jar with a cork lid and a matching spoon. For majoon, herbs, tablets and powders.',
    ['cream-jar', 'shilajit-jar']
  ),
  listedProduct(
    26,
    'premium-majoon-jar-gold-silver-glass',
    'Premium Majoon Jar, Gold & Silver (glass)',
    ['prenium-majoon-jars.png'],
    'Glass majoon jars with an embossed gold or silver metal finish and lid. For majoon, herbal and Unani products, churan, balm and dry fruits. A good gifting option.',
    ['cream-jar', 'shilajit-jar']
  ),
  listedProduct(
    27,
    'lip-gloss-tubes-5ml-10ml',
    'Lip Gloss Tubes 5ml & 10ml',
    ['lip-gloss-tubes.png'],
    'Clear 5ml and 10ml squeeze tubes with a soft applicator tip and a cap. For lip gloss, lip oil, lip serum and tinted gloss.',
    ['empty-tubes']
  ),
  listedProduct(
    28,
    'lipgloss-mascara-tubes',
    'Lipgloss & Mascara Tubes',
    ['lip-gloss-and-mascara-tubes.png'],
    'Square clear tubes with gold or black caps. Lip gloss tube: 6ml, doe-foot wand, 11.2 cm tall, 2.1 cm wide. Mascara tube: 10ml, fibre brush, 12.5 cm tall, 2.1 cm wide.',
    ['empty-tubes']
  ),
  listedProduct(
    29,
    'sun-block-bottle-50ml',
    'Sun Block Bottle 50ml',
    ['sunscreen-bottle.png'],
    '50ml pill-shaped bottle in sage green and white with a sun design on the cap. For sunscreen and skincare formulas. Compact and easy to carry.',
    ['cosmetic-pro']
  ),
  listedProduct(
    30,
    'premium-salt-grinders',
    'Premium Salt Grinders',
    ['premium-salt-grinders.png'],
    'Glass grinder bottles with steel or black tops and a ceramic grinding core. Adjustable from fine to coarse, with a wide opening for easy refilling. For salt, pepper and spices.',
    ['food-jar']
  ),
]
