export function resetPocketData({
  setPocketName,
  setPocketColor,
  setPocketIcon,
  setPocketBalanceTarget,
  setTargetDuration,
  setPocketType,
  setGoalTitle,
  setSelectedFriends,
  setPocketSubject,
  setAlertMessages,
  setShowAlertDialog,
  setNameIsInvalid,
  setSelectedColorIndex,
  setSelectedIconIndex,
}) {
  setPocketName("");
  setPocketColor("bg-orange-wondr");
  setPocketIcon("Pocket");
  setPocketBalanceTarget(null);
  setTargetDuration({ startDate: undefined, endDate: undefined });
  setPocketType(null);
  setGoalTitle(null);
  setSelectedFriends([]);
  setPocketSubject(null);
  setAlertMessages([]);
  setShowAlertDialog(false);
  setNameIsInvalid(false);
  setSelectedColorIndex(null);
  setSelectedIconIndex(null);
}

export function pocketValidation({
  pocketName,
  pocketType,
  pocketColor,
  pocketIcon,
  goalTitle,
  pocketBalanceTarget,
  targetDuration,
  setNameIsInvalid,
  setAlertMessages,
  setShowAlertDialog,
  pocketSubject,
  selectedFriends,
  allPocket,
  resetData,
  GoToNext,
}) {
  const nameTrimmed = pocketName.trim();
  const isNameInvalid =
    !nameTrimmed || nameTrimmed.length === 0 || nameTrimmed.length > 20;
  setNameIsInvalid(isNameInvalid);

  const isColorInvalid = !pocketColor || pocketColor === "";
  const isIconInvalid = !pocketIcon || pocketIcon === "";

  let isGoalInvalid = false;
  let isBalanceInvalid = false;
  let isDurationInvalid = false;

  if (pocketType === "Saving" || pocketType === "Enterprise Fund") {
    isGoalInvalid = !goalTitle || goalTitle === "";
    isBalanceInvalid =
      typeof pocketBalanceTarget !== "number" ||
      isNaN(pocketBalanceTarget) ||
      pocketBalanceTarget < 10000 ||
      !Number.isInteger(pocketBalanceTarget);
    isDurationInvalid =
      !targetDuration || !targetDuration.startDate || !targetDuration.endDate;
  }

  // Collect error messages (except name)
  const errors = [];
  if (isColorInvalid) errors.push("Warna pocket harus dipilih.");
  if (isIconInvalid) errors.push("Ikon pocket harus dipilih.");
  if (isGoalInvalid) errors.push("Goal harus dipilih.");
  if (isBalanceInvalid)
    errors.push("Target saldo minimal 10.000 dan harus berupa angka bulat.");
  if (isDurationInvalid)
    errors.push("Durasi target harus diisi (mulai & selesai).");

  if (
    isNameInvalid ||
    isColorInvalid ||
    isIconInvalid ||
    isGoalInvalid ||
    isBalanceInvalid ||
    isDurationInvalid
  ) {
    if (errors.length > 0) {
      setAlertMessages(errors);
      setShowAlertDialog(true);
    }
    return false;
  }

  const newPocket = {
    id: allPocket.length > 0 ? allPocket[allPocket.length - 1].id + 1 : 1,
    name: pocketName,
    subject: pocketSubject,
    type: pocketType,
    color: pocketColor,
    icon: pocketIcon,
    friends: selectedFriends,
    goalTitle,
    balanceTarget: pocketBalanceTarget,
    targetDuration,
  };
  allPocket.push(newPocket);
  console.log("Pocket created:", newPocket);

  resetData();
  GoToNext();

  return true;
}
