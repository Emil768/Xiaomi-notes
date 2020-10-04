export let modalInfoActive = (index) => ({
  type: "MODALINFO_ACTIVE",
  payload: index,
});

export let modalInfoClose = () => ({
  type: "MODALINFO_CLOSE",
  payload: false,
});
