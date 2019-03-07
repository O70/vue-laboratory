const coordinates = [
  /*
  [
    { x: -140, y: 60 },
    { x: -120, y: 60 },
    { x: -120, y: 50 },
    { x: -75, y: 50 },
    { x: -75, y: 25 },
    { x: -85, y: 25 },
    { x: -85, y: -35 },
    { x: -80, y: -35 },
    { x: -80, y: -75 },
    { x: -85, y: -75 },
    { x: -85, y: -135 },
    { x: -75, y: -135 },
    { x: -75, y: -160 },
    { x: -120, y: -160 },
    { x: -130, y: -160 },
    { x: -150, y: -160 },
    { x: -150, y: -125 },
    { x: -120, y: -125 },
    { x: -120, y: 25 },
    { x: -140, y: 25 }
  ]*/
]
// function main() {
//   // const x = -400
//   // const y = 200
//   //
//   // const points = []
//   // points.push({ x, y })
//   // points.push({ x: x + 30, y })
//   // points.push({ x: x + 30, y: y - 10 })
//   // points.push({ x: x + 80, y: y - 10 })
//   // points.push({ x: x + 80, y: y - 50 })
//   // points.push({ x: x + 60, y: y - 50 })
//   // points.push({ x: x + 60, y: y - 100 })
//   // points.push({ x: x + 70, y: y - 100 })
//   // points.push({ x: x + 70, y: y - 180 })
//   // points.push({ x: x + 60, y: y - 180 })
//   // points.push({ x: x + 60, y: y - 260 })
//   // points.push({ x: x + 80, y: y - 260 })
//   // points.push({ x: x + 80, y: y - 300 })
//   // points.push({ x: x + 30, y: y - 300 })
//   // points.push({ x: x + 30, y: y - 320 })
//   // points.push({ x: x, y: y - 320 })
//   // points.push({ x: x, y: y - 300 })
//   // points.push({ x: x + 30, y: y - 300 })
//   // points.push({ x: x + 30, y: y - 50 })
//   // points.push({ x: x, y: y - 50 })
//
//   const points = []
//   const x = -140
//   const y = 30
//   points.push({ x, y })
//   points.push({ x, y: y + 19 })
//   points.push({ x: x + 77, y: y + 19 })
//   points.push({ x: x + 77, y: y + 19 + 37 })
//   points.push({ x: x + 77 - 27, y: y + 19 + 37 })
//   points.push({ x: x + 77 - 27, y: y + 19 + 37 + 73 })
//   points.push({ x: x + 77 - 27 + 8, y: y + 19 + 37 + 73 })
//   points.push({ x: x + 77 - 27 + 8, y: y + 19 + 37 + 73 + 94 })
//   points.push({ x: x + 77 - 27 + 8 - 8, y: y + 19 + 37 + 73 + 94 })
//   points.push({ x: x + 77 - 27 + 8 - 8, y: y + 19 + 37 + 73 + 94 + 62 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30, y: y + 19 + 37 + 73 + 94 + 62 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30, y: y + 19 + 37 + 73 + 94 + 62 + 40 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30 - 77, y: y + 19 + 37 + 73 + 94 + 62 + 40 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30 - 77, y: y + 19 + 37 + 73 + 94 + 62 + 40 + 18 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30 - 77 - 40, y: y + 19 + 37 + 73 + 94 + 62 + 40 + 18 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30 - 77 - 40, y: y + 19 + 37 + 73 + 94 + 62 + 40 + 18 - 56 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30 - 77 - 40 + 51, y: y + 19 + 37 + 73 + 94 + 62 + 40 + 18 - 56 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30 - 77 - 40 + 51, y: y + 19 + 37 + 73 + 94 + 62 + 40 + 18 - 56 - 232 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30 - 77 - 40 + 51 - 55, y: y + 19 + 37 + 73 + 94 + 62 + 40 + 18 - 56 - 232 })
//   points.push({ x: x + 77 - 27 + 8 - 8 + 30 - 77 - 40 + 51 - 55, y: y + 19 + 37 + 73 + 94 + 62 + 40 + 18 - 56 - 232 - 55 })
//
//   return points
// }
//
// function dataCenter() {
//   const points = []
//   const x = 30
//   const y = 373
//   points.push({ x, y })
//   points.push({ x: x + 250, y: y + 3 })
//   points.push({ x: x + 250, y: y - 68 })
//   // points.push({ x: x + 250 + 9, y: y - 68 })
//   // points.push({ x: x + 250 + 9, y: y - 68 - 57 })
//   // points.push({ x: x + 250 + 9 - 132, y: y - 68 - 57 })
//   // points.push({ x: x + 250 + 9 - 132, y: y - 68 - 57 + 57 })
//   points.push({ x, y: y - 68 })
//   // points.push({ x: x + 20, y })
//   // points.push({ x: x + 20, y: y - 20 })
//   // points.push({ x: x, y: y - 20 })
//
//   return points
// }
//
// function oldMachine() {
//   const points = []
//   const x = 289
//   const y = 305
//   points.push({ x, y })
//   points.push({ x: x, y: y - 57 })
//   points.push({ x: x - 132, y: y - 57 })
//   points.push({ x: x - 132, y: y - 57 + 57 })
//
//   return points
// }
//
// function tech() {
//   const points = []
//   const x = 50
//   const y = 153
//   points.push({ x, y })
//   points.push({ x: x + 138, y })
//   points.push({ x: x + 138, y: y - 30 })
//   points.push({ x, y: y - 30 })
//
//   return points
// }
//
// function tech2() {
//   const points = []
//   const x = 50
//   const y = 123
//   points.push({ x, y })
//   points.push({ x: x + 80, y })
//   points.push({ x: x + 80, y: y - 80 })
//   points.push({ x, y: y - 80 })
//
//   return points
// }

// 主楼
// function test() {
//   const points = []
//
//   // points.push({ x: 588.7800, y: 327.2017 })
//   // points.push({ x: 564.1200, y: 325.9417 })
//   // points.push({ x: 565.2000, y: 307.4017 })
//   // points.push({ x: 538.7400, y: 306.3217 })
//   // points.push({ x: 534.4200, y: 306.1417 })
//   // points.push({ x: 475.2000, y: 303.4417 })
//   // points.push({ x: 474.4800, y: 322.8817 })
//   // points.push({ x: 450.1800, y: 321.6217 })
//   // points.push({ x: 451.4400, y: 287.9617 })
//   // points.push({ x: 451.8000, y: 278.6017 })
//   // points.push({ x: 452.8800, y: 245.4817 })
//   // points.push({ x: 477.5400, y: 246.3817 })
//   // points.push({ x: 477.0000, y: 266.0017 })
//   // points.push({ x: 516.6000, y: 267.6217 })
//   // points.push({ x: 527.0400, y: 267.9817 })
//   // points.push({ x: 567.1800, y: 269.7817 })
//   // points.push({ x: 567.9000, y: 250.1617 })
//   // points.push({ x: 592.2000, y: 251.4217 })
//   // points.push({ x: 592.2000, y: 251.7817 })
//
//   points.push({ x: 479.5200, y: 800.4217 })
//   points.push({ x: 430.3800, y: 798.8017 })
//   points.push({ x: 427.6800, y: 859.1017 })
//   points.push({ x: 469.6200, y: 860.5417 })
//   points.push({ x: 470.1600, y: 841.6417 })
//   points.push({ x: 485.4600, y: 842.3617 })
//   points.push({ x: 485.1000, y: 852.0817 })
//
//   points.push({ x: 485.4600, y: 842.3617 })
//   points.push({ x: 511.9200, y: 843.8017 })
//   points.push({ x: 554.4000, y: 845.7817 })
//   points.push({ x: 555.1200, y: 830.4817 })
//   points.push({ x: 555.4800, y: 818.9617 })
//   points.push({ x: 556.2000, y: 803.8417 })
//   points.push({ x: 522.7200, y: 802.4017 })
//
//   points.push({ x: 525.4200, y: 729.8617 })
//   points.push({ x: 524.8800, y: 746.0617 })
//   points.push({ x: 523.4400, y: 779.9017 })
//   points.push({ x: 522.7200, y: 802.4017 })
//   points.push({ x: 522.0000, y: 820.9417 })
//   points.push({ x: 479.1600, y: 818.9617 })
//   points.push({ x: 479.5200, y: 800.4217 })
//
//   points.push({ x: 482.5800, y: 728.0617 })
//   points.push({ x: 479.5200, y: 800.4217 })
//
//   points.push({ x: 477.7200, y: 727.8817 })
//   points.push({ x: 482.5800, y: 728.0617 })
//   points.push({ x: 525.4200, y: 729.8617 })
//
//   points.push({ x: 481.6800, y: 631.2217 })
//   points.push({ x: 477.7200, y: 727.8817 })
//
//   points.push({ x: 528.1200, y: 730.0417 })
//   points.push({ x: 529.2000, y: 702.3217 })
//   points.push({ x: 532.2600, y: 633.3817 })
//
//   points.push({ x: 529.2000, y: 633.2017 })
//   points.push({ x: 486.3600, y: 631.5817 })
//   points.push({ x: 481.6800, y: 631.2217 })
//
//   points.push({ x: 489.0600, y: 557.7817 })
//   points.push({ x: 486.3600, y: 631.5817 })
//
//   points.push({ x: 529.2000, y: 633.2017 })
//   points.push({ x: 532.2600, y: 633.3817 })
//   points.push({ x: 532.6200, y: 617.3617 })
//   points.push({ x: 529.7400, y: 617.1817 })
//   points.push({ x: 531.9000, y: 559.7617 })
//
//   points.push({ x: 529.7400, y: 617.1817 })
//   points.push({ x: 532.2600, y: 633.3817 })
//
//   points.push({ x: 529.7400, y: 617.1817 })
//   points.push({ x: 529.2000, y: 633.2017 })
//
//   points.push({ x: 500.0400, y: 516.3817 })
//   points.push({ x: 524.1600, y: 517.1017 })
//   points.push({ x: 568.6200, y: 518.9017 })
//   points.push({ x: 567.9000, y: 534.0217 })
//   points.push({ x: 567.3600, y: 548.4217 })
//   points.push({ x: 566.6400, y: 561.0217 })
//   points.push({ x: 564.4800, y: 561.0217 })
//   points.push({ x: 531.9000, y: 559.7617 })
//   points.push({ x: 532.4400, y: 541.2217 })
//   points.push({ x: 489.7800, y: 539.7817 })
//   points.push({ x: 489.0600, y: 557.7817 })
//   points.push({ x: 440.6400, y: 555.9817 })
//   points.push({ x: 443.1600, y: 494.9617 })
//   points.push({ x: 458.6400, y: 495.5017 })
//
//   points.push({ x: 500.0400, y: 516.3817 })
//   points.push({ x: 484.2000, y: 515.6617 })
//   points.push({ x: 484.9200, y: 496.4017 })
//   points.push({ x: 458.6400, y: 495.5017 })
//
//   points.push({ x: 524.3400, y: 508.1017 })
//   points.push({ x: 500.0400, y: 507.0217 })
//   points.push({ x: 500.0400, y: 516.3817 })
//
//   points.push({ x: 500.0400, y: 507.0217 })
//   points.push({ x: 524.1600, y: 517.1017 })
//
//   points.push({ x: 524.1600, y: 517.1017 })
//   points.push({ x: 524.3400, y: 508.1017 })
//
//   points.push({ x: 524.8800, y: 746.0617 })
//   points.push({ x: 527.5800, y: 746.2417 })
//   points.push({ x: 528.1200, y: 730.0417 })
//
//   points.push({ x: 528.1200, y: 730.0417 })
//   points.push({ x: 525.4200, y: 729.8617 })
//
//   return points
// }

// 南教楼
// function test2() {
//   const points = []
//
//   // points.push({ x: 588.7800, y: 327.2017 })
//   // points.push({ x: 564.1200, y: 325.9417 })
//   // points.push({ x: 565.2000, y: 307.4017 })
//   // points.push({ x: 538.7400, y: 306.3217 })
//   // points.push({ x: 534.4200, y: 306.1417 })
//   // points.push({ x: 475.2000, y: 303.4417 })
//   // points.push({ x: 474.4800, y: 322.8817 })
//   // points.push({ x: 450.1800, y: 321.6217 })
//   // points.push({ x: 451.4400, y: 287.9617 })
//   //
//   // points.push({ x: 451.8000, y: 278.6017 })
//   // points.push({ x: 452.8800, y: 245.4817 })
//   // points.push({ x: 477.5400, y: 246.3817 })
//   // points.push({ x: 477.0000, y: 266.0017 })
//   // points.push({ x: 516.6000, y: 267.6217 })
//   // points.push({ x: 527.0400, y: 267.9817 })
//   // points.push({ x: 567.1800, y: 269.7817 })
//   // points.push({ x: 567.9000, y: 250.1617 })
//   // points.push({ x: 592.2000, y: 251.4217 })
//   // points.push({ x: 592.2000, y: 251.7817 })
//
//   points.push({ x: 631.8000, y: 808.1617 })
//   points.push({ x: 630.3600, y: 877.4617 })
//   points.push({ x: 650.8800, y: 877.8217 })
//   points.push({ x: 652.1400, y: 808.5217 })
//   points.push({ x: 631.8000, y: 808.1617 })
//
//   points.push({ x: 650.8800, y: 877.8217 })
//   points.push({ x: 909.1800, y: 888.8017 })
//   points.push({ x: 911.8800, y: 816.4417 })
//   points.push({ x: 652.1400, y: 808.5217 })
//   points.push({ x: 650.8800, y: 877.8217 })
//
//   points.push({ x: 779.4000, y: 812.3017 })
//   points.push({ x: 780.6600, y: 784.7617 })
//
//   points.push({ x: 783.3600, y: 754.3417 })
//   points.push({ x: 782.6400, y: 771.9817 })
//   points.push({ x: 782.1000, y: 784.9417 })
//   points.push({ x: 780.6600, y: 784.7617 })
//
//   points.push({ x: 905.0400, y: 816.0817 })
//   points.push({ x: 906.4800, y: 778.6417 })
//   points.push({ x: 906.4800, y: 775.2217 })
//   points.push({ x: 907.0200, y: 759.2017 })
//   points.push({ x: 794.8800, y: 754.7017 })
//
//   points.push({ x: 791.6400, y: 754.5217 })
//   points.push({ x: 783.3600, y: 754.3417 })
//
//   points.push({ x: 671.7600, y: 790.5217 })
//   points.push({ x: 694.4400, y: 790.8817 })
//
//   points.push({ x: 672.1200, y: 781.3417 })
//   points.push({ x: 694.6200, y: 781.8817 })
//
//   points.push({ x: 671.9400, y: 786.0217 })
//   points.push({ x: 694.4400, y: 786.3817 })
//
//   points.push({ x: 672.1200, y: 776.6617 })
//   points.push({ x: 694.8000, y: 777.2017 })
//
//   points.push({ x: 671.7600, y: 795.2017 })
//   points.push({ x: 694.4400, y: 795.5617 })
//
//   points.push({ x: 672.1200, y: 772.3417 })
//   points.push({ x: 671.4000, y: 809.0617 })
//   points.push({ x: 694.0800, y: 809.6017 })
//   points.push({ x: 694.8000, y: 772.7017 })
//
//   points.push({ x: 671.5800, y: 804.3817 })
//   points.push({ x: 694.0800, y: 804.9217 })
//
//   points.push({ x: 671.5800, y: 799.7017 })
//   points.push({ x: 694.2600, y: 800.2417 })
//
//   return points
// }

// coordinates.push(main())
// coordinates.push(dataCenter())
// coordinates.push(oldMachine())
// coordinates.push(tech())
// coordinates.push(tech2())
// coordinates.push(test())
// coordinates.push(test2())

// 数据中心
function t1() {
  const points = []

  points.push({ x: 650.8800, y: 877.8217 })
  points.push({ x: 909.1800, y: 888.8017 })
  points.push({ x: 911.8800, y: 816.4417 })
  points.push({ x: 652.1400, y: 808.5217 })

  return points
}

// 老机房
function t2() {
  const points = []

  points.push({ x: 779.4000, y: 812.3017 })
  points.push({ x: 905.0400, y: 816.0817 })
  points.push({ x: 907.0200, y: 759.2017 })
  points.push({ x: 783.3642, y: 754.2396 })

  return points
}

// 科技会议中心
function t3() {
  const points = []

  points.push({ x: 662.4000, y: 575.7817 })
  points.push({ x: 657.7200, y: 579.7417 })
  points.push({ x: 655.9200, y: 584.2417 })
  points.push({ x: 656.2800, y: 595.2217 })
  points.push({ x: 658.8000, y: 597.3817 })
  points.push({ x: 662.2200, y: 599.1817 })
  points.push({ x: 666.0000, y: 599.9017 })
  points.push({ x: 667.8000, y: 600.6217 })
  points.push({ x: 665.4600, y: 672.2617 })
  points.push({ x: 721.8000, y: 674.6017 })
  points.push({ x: 722.3400, y: 661.4617 })
  points.push({ x: 752.2200, y: 662.5417 })
  points.push({ x: 756.0000, y: 576.5017 })
  points.push({ x: 669.6000, y: 573.6217 })

  return points
}

// 科技会议中心北部
function t4() {
  const points = []

  points.push({ x: 721.2600, y: 690.8017 })
  points.push({ x: 811.9800, y: 694.5817 })
  points.push({ x: 812.7000, y: 678.0217 })
  points.push({ x: 812.8800, y: 675.5017 })
  points.push({ x: 813.2400, y: 664.1617 })
  points.push({ x: 813.2400, y: 663.9817 })
  points.push({ x: 811.9800, y: 660.5617 })
  points.push({ x: 809.8200, y: 658.5817 })
  points.push({ x: 807.3000, y: 657.5017 })
  points.push({ x: 804.0600, y: 657.5017 })
  points.push({ x: 801.1800, y: 658.9417 })
  points.push({ x: 799.2000, y: 661.4617 })
  points.push({ x: 798.3000, y: 664.7017 })
  points.push({ x: 752.2200, y: 662.7217 })
  points.push({ x: 722.3400, y: 661.4617 })

  return points
}

// 食堂
function t5() {
  const points = []

  points.push({ x: 850.6800, y: 544.2817 })
  points.push({ x: 899.8200, y: 546.2617 })
  points.push({ x: 901.0800, y: 546.6217 })
  points.push({ x: 904.1400, y: 548.0617 })
  points.push({ x: 905.4000, y: 549.1417 })
  points.push({ x: 906.8400, y: 551.3017 })
  points.push({ x: 907.2000, y: 552.9217 })
  points.push({ x: 907.0200, y: 557.7817 })
  points.push({ x: 905.4000, y: 559.9417 })
  points.push({ x: 902.8800, y: 561.0217 })
  points.push({ x: 899.2800, y: 562.1017 })
  points.push({ x: 897.6600, y: 603.6817 })
  points.push({ x: 897.4800, y: 604.2217 })
  points.push({ x: 895.8600, y: 608.0017 })
  points.push({ x: 893.1600, y: 610.3417 })
  points.push({ x: 890.6400, y: 611.0617 })
  points.push({ x: 887.4000, y: 610.8817 })
  points.push({ x: 885.6000, y: 610.1617 })
  points.push({ x: 883.4400, y: 607.8217 })
  points.push({ x: 882.3600, y: 605.4817 })
  points.push({ x: 882.1800, y: 603.6817 })
  points.push({ x: 876.9600, y: 603.5017 })
  points.push({ x: 842.2200, y: 602.0617 })
  points.push({ x: 837.7200, y: 601.3417 })
  points.push({ x: 836.2800, y: 600.6217 })
  points.push({ x: 834.1200, y: 598.2817 })
  points.push({ x: 833.2200, y: 596.3017 })
  points.push({ x: 832.8600, y: 593.4217 })
  points.push({ x: 833.0400, y: 592.1617 })
  points.push({ x: 834.4800, y: 588.9217 })
  points.push({ x: 836.6400, y: 587.4817 })
  points.push({ x: 840.6000, y: 586.5817 })
  points.push({ x: 841.5000, y: 565.8817 })
  points.push({ x: 842.5800, y: 543.9217 })

  return points
}

// 科技楼
function t6() {
  const points = []

  points.push({ x: 698.4000, y: 559.7617 })
  points.push({ x: 713.8800, y: 560.3017 })
  points.push({ x: 831.7800, y: 565.5217 })
  points.push({ x: 841.5000, y: 565.8817 })
  points.push({ x: 842.5800, y: 543.9217 })
  points.push({ x: 842.9400, y: 537.6217 })
  points.push({ x: 843.4800, y: 525.0217 })
  points.push({ x: 833.5800, y: 524.6617 })
  points.push({ x: 833.4000, y: 530.0617 })
  points.push({ x: 824.5800, y: 529.7017 })
  points.push({ x: 808.7400, y: 528.9817 })
  points.push({ x: 676.8000, y: 523.2217 })
  points.push({ x: 676.0800, y: 538.8817 })
  points.push({ x: 681.6600, y: 539.2417 })
  points.push({ x: 680.7600, y: 558.8617 })

  return points
}

// 中油宾馆
function t7() {
  const points = []

  points.push({ x: 340.5600, y: 213.4417 })
  points.push({ x: 343.3078, y: 200.2053 })
  points.push({ x: 351.2110, y: 189.1124 })
  points.push({ x: 362.8599, y: 182.1502 })
  points.push({ x: 376.2000, y: 180.5017 })
  points.push({ x: 377.6400, y: 147.9217 })
  points.push({ x: 475.3800, y: 151.3417 })
  points.push({ x: 475.5600, y: 148.2817 })
  points.push({ x: 483.6600, y: 148.8217 })
  points.push({ x: 484.9200, y: 123.6217 })
  points.push({ x: 476.6400, y: 122.9017 })
  points.push({ x: 477.0000, y: 113.9017 })
  points.push({ x: 379.8000, y: 110.3017 })
  points.push({ x: 379.8000, y: 106.7017 })
  points.push({ x: 334.8000, y: 105.4417 })
  points.push({ x: 334.4400, y: 122.7217 })
  points.push({ x: 327.9600, y: 122.5417 })
  points.push({ x: 286.5600, y: 161.0617 })
  points.push({ x: 286.2000, y: 168.2617 })
  points.push({ x: 268.9200, y: 167.5417 })
  points.push({ x: 266.7600, y: 210.9217 })
  points.push({ x: 271.8000, y: 211.1017 })
  points.push({ x: 266.4000, y: 330.2617 })
  points.push({ x: 262.8000, y: 330.2617 })
  points.push({ x: 261.0000, y: 372.2017 })
  points.push({ x: 263.7000, y: 372.3817 })
  points.push({ x: 261.9000, y: 412.7017 })
  points.push({ x: 297.3600, y: 414.1417 })
  points.push({ x: 299.3400, y: 373.8217 })
  points.push({ x: 301.3200, y: 373.8217 })
  points.push({ x: 302.0400, y: 355.4617 })
  points.push({ x: 298.2600, y: 355.2817 })
  points.push({ x: 299.1600, y: 334.0417 })
  points.push({ x: 302.9400, y: 334.2217 })
  points.push({ x: 307.8000, y: 212.0017 })

  return points
}

// 华府酒楼
function t8() {
  const points = []

  points.push({ x: 511.9200, y: 229.4617 })
  points.push({ x: 589.6800, y: 232.3417 })
  points.push({ x: 592.7400, y: 145.0417 })
  points.push({ x: 531.1800, y: 142.5217 })
  points.push({ x: 531.0000, y: 146.6617 })
  points.push({ x: 528.4800, y: 146.6617 })
  points.push({ x: 528.4800, y: 144.8617 })
  points.push({ x: 528.1200, y: 143.6017 })
  points.push({ x: 527.4000, y: 141.8017 })
  points.push({ x: 526.3200, y: 140.3617 })
  points.push({ x: 525.4200, y: 139.4617 })
  points.push({ x: 523.9800, y: 138.5617 })
  points.push({ x: 522.3600, y: 137.8417 })
  points.push({ x: 520.0200, y: 137.3017 })
  points.push({ x: 517.3200, y: 137.4817 })
  points.push({ x: 515.5200, y: 138.0217 })
  points.push({ x: 515.5200, y: 138.0217 })
  points.push({ x: 513.7200, y: 139.1017 })
  points.push({ x: 512.4600, y: 140.1817 })
  points.push({ x: 511.3800, y: 141.6217 })
  points.push({ x: 510.4800, y: 143.7817 })
  points.push({ x: 510.1200, y: 145.4017 })
  points.push({ x: 510.1200, y: 147.9217 })
  points.push({ x: 510.8400, y: 150.4417 })
  points.push({ x: 511.5600, y: 151.7017 })
  points.push({ x: 512.6400, y: 152.9617 })
  points.push({ x: 514.0800, y: 154.2217 })
  points.push({ x: 514.8000, y: 154.5817 })
  points.push({ x: 514.8000, y: 156.0217 })
  points.push({ x: 509.4000, y: 155.8417 })
  points.push({ x: 509.4000, y: 157.8217 })
  points.push({ x: 506.8800, y: 158.9017 })
  points.push({ x: 506.8800, y: 163.2217 })
  points.push({ x: 509.0400, y: 164.6617 })
  points.push({ x: 509.0400, y: 166.4617 })
  points.push({ x: 514.2600, y: 166.4617 })

  return points
}

// 南教楼
function t9() {
  const points = []

  points.push({ x: 588.7800, y: 327.2017 })
  points.push({ x: 592.2000, y: 251.4217 })
  points.push({ x: 567.9000, y: 250.1617 })
  points.push({ x: 567.1800, y: 269.7817 })
  points.push({ x: 477.0000, y: 266.0017 })
  points.push({ x: 477.5400, y: 246.3817 })
  points.push({ x: 452.8800, y: 245.4817 })
  points.push({ x: 450.1800, y: 321.6217 })
  points.push({ x: 474.4800, y: 322.8817 })
  points.push({ x: 475.2000, y: 303.4417 })
  points.push({ x: 565.2000, y: 307.4017 })
  points.push({ x: 564.1200, y: 325.9417 })

  return points
}

// 主楼
function t10() {
  const points = []

  points.push({ x: 427.6800, y: 859.1017 })
  points.push({ x: 469.6200, y: 860.5417 })
  points.push({ x: 470.1600, y: 841.6417 })
  points.push({ x: 554.4000, y: 845.7817 })
  points.push({ x: 556.2000, y: 803.8417 })
  points.push({ x: 522.7200, y: 802.4017 })
  points.push({ x: 525.4200, y: 729.8617 })
  points.push({ x: 528.1200, y: 730.0417 })
  points.push({ x: 532.2600, y: 633.3817 })
  points.push({ x: 529.2000, y: 633.2017 })
  points.push({ x: 531.9000, y: 559.7617 })
  points.push({ x: 566.6400, y: 561.0217 })
  points.push({ x: 568.6200, y: 518.9017 })
  points.push({ x: 484.2066, y: 515.4842 })
  points.push({ x: 484.9200, y: 496.4017 })
  points.push({ x: 443.1600, y: 494.9617 })
  points.push({ x: 440.6400, y: 555.9817 })
  points.push({ x: 489.0600, y: 557.7817 })
  points.push({ x: 486.3600, y: 631.5817 })
  points.push({ x: 481.6800, y: 631.2217 })
  points.push({ x: 477.7200, y: 727.8817 })
  points.push({ x: 482.5800, y: 728.0617 })
  points.push({ x: 479.5200, y: 800.4217 })
  points.push({ x: 430.3800, y: 798.8017 })

  return points
}

// 实验楼一区
function t11() {
  const points = []

  points.push({ x: 742.4907, y: 415.8622 })
  points.push({ x: 744.4800, y: 356.1817 })
  points.push({ x: 739.0800, y: 356.0017 })
  points.push({ x: 739.2600, y: 346.8217 })
  points.push({ x: 667.6200, y: 343.4017 })
  points.push({ x: 667.0800, y: 352.9417 })
  points.push({ x: 661.6800, y: 352.9417 })
  points.push({ x: 659.7000, y: 405.5017 })
  points.push({ x: 665.4600, y: 405.8617 })
  points.push({ x: 664.9200, y: 415.2217 })
  points.push({ x: 735.6600, y: 418.1017 })
  points.push({ x: 736.2000, y: 415.5817 })

  return points
}

// 实验楼二区
function t12() {
  const points = []

  points.push({ x: 758.1166, y: 416.5589 })
  points.push({ x: 760.6800, y: 356.9017 })
  points.push({ x: 766.0800, y: 356.9017 })
  points.push({ x: 766.6200, y: 347.7217 })
  points.push({ x: 837.9000, y: 351.1417 })
  points.push({ x: 837.9000, y: 360.1477 })
  points.push({ x: 843.1200, y: 360.3217 })
  points.push({ x: 841.1840, y: 420.3372 })
  points.push({ x: 834.8400, y: 420.0817 })
  points.push({ x: 834.6600, y: 422.4217 })
  points.push({ x: 764.4600, y: 419.1817 })
  points.push({ x: 764.4600, y: 416.8417 })

  return points
}

// 实验楼三区
function t13() {
  const points = []

  points.push({ x: 861.6600, y: 421.1617 })
  points.push({ x: 856.8305, y: 420.9673 })
  points.push({ x: 858.9600, y: 361.0417 })
  points.push({ x: 865.0800, y: 361.2217 })
  points.push({ x: 865.0800, y: 352.2217 })
  points.push({ x: 936.0000, y: 355.1017 })
  points.push({ x: 935.8200, y: 364.4617 })
  points.push({ x: 941.5800, y: 364.6417 })
  points.push({ x: 939.2145, y: 417.0217 })
  points.push({ x: 933.1200, y: 417.0217 })
  points.push({ x: 932.7600, y: 426.5617 })
  points.push({ x: 861.6600, y: 423.5017 })

  return points
}

// 实验楼四区
function t14() {
  const points = []

  points.push({ x: 978.3000, y: 427.8217 })
  points.push({ x: 981.0000, y: 357.2617 })
  points.push({ x: 990.3867, y: 357.2617 })
  points.push({ x: 990.7200, y: 352.7617 })
  points.push({ x: 1044.5400, y: 354.3817 })
  points.push({ x: 1044.5400, y: 360.1512 })
  points.push({ x: 1053.0000, y: 360.5017 })
  points.push({ x: 1049.9400, y: 430.7017 })
  points.push({ x: 1039.8600, y: 430.3417 })
  points.push({ x: 1039.8600, y: 436.4617 })
  points.push({ x: 987.8400, y: 434.3017 })
  points.push({ x: 987.8400, y: 428.1714 })

  return points
}

// 实验楼五区
function t15() {
  const points = []

  points.push({ x: 1047.4200, y: 255.7417 })
  points.push({ x: 995.4000, y: 253.5817 })
  points.push({ x: 995.0400, y: 259.7017 })
  points.push({ x: 984.9600, y: 259.1617 })
  points.push({ x: 982.4400, y: 329.5417 })
  points.push({ x: 991.4400, y: 329.9017 })
  points.push({ x: 991.4400, y: 336.0217 })
  points.push({ x: 1045.0800, y: 337.8217 })
  points.push({ x: 1045.0800, y: 332.4217 })
  points.push({ x: 1054.2600, y: 332.7817 })
  points.push({ x: 1057.1400, y: 261.6817 })
  points.push({ x: 1047.4200, y: 261.3217 })

  return points
}

// 实验楼六区
function t16() {
  const points = []

  points.push({ x: 894.4200, y: 226.5817 })
  points.push({ x: 890.8200, y: 325.5817 })
  points.push({ x: 937.2600, y: 327.3817 })
  points.push({ x: 940.6800, y: 228.7417 })

  return points
}

// 实验楼七区
function t17() {
  const points = []

  points.push({ x: 762.3000, y: 264.7417 })
  points.push({ x: 764.4600, y: 217.9417 })
  points.push({ x: 894.4200, y: 223.3417 })
  points.push({ x: 892.6200, y: 270.1417 })

  return points
}

// 老年食堂、文印室
function t18() {
  const points = []

  points.push({ x: 1018.4400, y: 517.6417 })
  points.push({ x: 970.2000, y: 516.0217 })
  points.push({ x: 969.4800, y: 537.6217 })
  points.push({ x: 1017.7730, y: 539.1509 })
  points.push({ x: 1018.7664, y: 507.1163 })
  points.push({ x: 1048.6788, y: 508.3067 })
  points.push({ x: 1045.4400, y: 573.9817 })
  points.push({ x: 947.8800, y: 570.0217 })
  points.push({ x: 950.9400, y: 491.1817 })
  points.push({ x: 1035.1800, y: 494.0617 })
  points.push({ x: 1034.8200, y: 507.7417 })
  points.push({ x: 1018.7664, y: 507.1163 })

  return points
}

// 游泳馆
function t19() {
  const points = []

  points.push({ x: 945.0000, y: 765.1417 })
  points.push({ x: 951.4800, y: 588.0217 })
  points.push({ x: 1045.0800, y: 593.0617 })
  points.push({ x: 1042.0200, y: 666.8617 })
  points.push({ x: 1044.1800, y: 672.6217 })
  points.push({ x: 1045.4400, y: 678.5617 })
  points.push({ x: 1045.4400, y: 684.3217 })
  points.push({ x: 1044.7200, y: 690.2617 })
  points.push({ x: 1042.2000, y: 697.2817 })
  points.push({ x: 1040.9400, y: 699.6217 })
  points.push({ x: 1037.1600, y: 780.0817 })
  points.push({ x: 973.6200, y: 777.7417 })
  points.push({ x: 974.1676, y: 766.2418 })

  return points
}

// 游泳馆北旁边小楼
function t20() {
  const points = []

  points.push({ x: 973.6200, y: 777.7417 })
  points.push({ x: 973.6200, y: 766.2217 })
  points.push({ x: 954.0000, y: 765.4230 })
  points.push({ x: 953.2800, y: 776.6617 })
  points.push({ x: 930.9600, y: 775.4017 })
  points.push({ x: 929.7000, y: 807.8017 })
  points.push({ x: 1036.4400, y: 810.6817 })
  points.push({ x: 1037.1600, y: 780.0817 })

  return points
}

// 西边小食堂
function t21() {
  const points = []

  points.push({ x: 285.1200, y: 887.7217 })
  points.push({ x: 301.6800, y: 888.6217 })
  points.push({ x: 305.4600, y: 779.0017 })
  points.push({ x: 288.9000, y: 778.4617 })

  return points
}

coordinates.push(t1())
coordinates.push(t2())
coordinates.push(t3())
coordinates.push(t4())
coordinates.push(t5())
coordinates.push(t6())
coordinates.push(t7())
coordinates.push(t8())
coordinates.push(t9())
coordinates.push(t10())
coordinates.push(t11())
coordinates.push(t12())
coordinates.push(t13())
coordinates.push(t14())
coordinates.push(t15())
coordinates.push(t16())
coordinates.push(t17())
coordinates.push(t18())
coordinates.push(t19())
coordinates.push(t20())
coordinates.push(t21())

// function max() {
//   const points = []
//
//   points.push({ x: 460, y: 460 })
//   points.push({ x: -460, y: 460 })
//   points.push({ x: -460, y: -460 })
//   points.push({ x: 460, y: -460 })
//
//   return points
// }
//
// coordinates.push(max())

export default coordinates
