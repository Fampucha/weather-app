export function getClosestHourIndex(hours = [], referenceEpoch) {
  if (!hours.length || !referenceEpoch) return 0;

  const index = hours.findLastIndex(
    item => item.time_epoch <= referenceEpoch
  );

  return index !== -1 ? index : hours.length - 1;
}