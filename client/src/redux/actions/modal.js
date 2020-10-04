export let modalActive = () => ({
  type: "MODAL_ACTIVE",
  payload: true,
});

export let modalClose = () => ({
  type: "MODAL_CLOSE",
  payload: false,
});
