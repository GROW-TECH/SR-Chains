// ================= RATE ENGINE =================
export function calculateNetRate(mcxRate, premium) {
  return mcxRate + premium;
}

export function calculateRetailRate(netRate) {
  return netRate + (netRate * 1) / 100;
}

// ================= PRODUCT CALCULATOR =================
export function calculateWeight(sizeInInches, weightPerInch) {
  return sizeInInches * weightPerInch;
}

export function calculatePurePayable(
  totalWeight,
  purityPercent,
  wastagePercent
) {
  return (totalWeight * (purityPercent + wastagePercent)) / 100;
}

export function calculateAmount(
  purePayable,
  saleRate,
  makingCharges
) {
  return purePayable * saleRate + makingCharges;
}
