// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Codes about page rendering ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// let beneficiaryName = $("#beneficiaryName");
// let beneficiaryDOB = $("#beneficiaryDOB");
// let beneficiaryAddress = $("#beneficiaryAddress");
// let beneficiaryRelation = $("#beneficiaryRelation");
// let beneficiaryID = $("#beneficiaryId");
// let beneficiaryIsChild = $("#beneficiaryIsChild");
// let beneficiaryIsCharity = $("#beneficiaryIsCharity");
// let beneficiaryGuardianName = $("#beneficiaryGuardianName");
// let beneficiaryGuardianAddress = $("#beneficiaryGuardianAddress");
// let beneficiaryAdd = $("#addBeneficiary");
// let beneficiaryUpdate = $("#updateBeneficiary");

// let executorID = $("#executorId");
// let executorName = $("#executorName");
// let executorDOB = $("#executorDOB");
// let executorAddress = $("#executorAddress");
// let executorRelation = $("#executorRelation");
// let executorIsAlternate = $("#executorIsAlternate");
// let executorAdd = $("#executorAdd");
// let executorUpdate = $("#executorUpdate");

// let assetID = $("#assetId");
// let assetDescription = $("#assetDescription");
// let assetValue = $("#assetValue");
// let assetType = $("#assetType");

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Beneficiary relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓


// $(".beneficiaryDelete").on("click", deleteBenificiary);
// function deleteBenificiary(event) {
//   event.stopPropagation();
//   let targetDeleteBtn = $(event.target);
//   let beneficiaryOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
//   console.log(beneficiaryOb.id);
//   $(event.target).parent().remove();
//   // Call this Backend Route with this method
//   fetch(`/api/beneficiary/${beneficiaryOb.id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

// $(".beneficiaryBtn").on("mouseover", updateBeneficiaryModal);
// $(".beneficiaryBtn").on("focus", updateBeneficiaryModal);

// function updateBeneficiaryModal(event) {
//   //   event.stopPropagation();
//   let benificiaryBtn = $(event.target);

//   let beneficiaryObject = JSON.parse(benificiaryBtn.attr("data"));
//   beneficiaryID.val(beneficiaryObject.id);
//   beneficiaryName.val(beneficiaryObject.name);
//   beneficiaryDOB.val(beneficiaryObject.DOB);
//   beneficiaryRelation.val(beneficiaryObject.relationship);
//   beneficiaryAddress.val(beneficiaryObject.address);
//   beneficiaryIsChild.attr("checked", beneficiaryObject.isChild);
//   beneficiaryIsCharity.attr("checked", beneficiaryObject.isCharity);
//   beneficiaryGuardianAddress.val(beneficiaryObject.guardian_address);
//   beneficiaryGuardianName.val(beneficiaryObject.guardian_name);
// }

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Beneficiary relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// %%%%%%%%%%%%%%%%%% Delete Handler %%%%%%%%%%%%%%%%%%
const deleteBenificiary = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let beneficiaryOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/beneficiary/${beneficiaryOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    $(event.target).parent().remove();
  }
};

$(".beneficiaryDelete").on("click", deleteBenificiary);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addBeneficiary = async (event) => {
  event.preventDefault();
  const name = $("#beneficiaryName").val().trim();
  const address = $("#beneficiaryAddress").val();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if ( name && address ) {
    const response = await fetch(`/api/beneficiary`, {
      method: "POST",
      body: JSON.stringify({ name, address }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add");
    }
    location.reload();
  }
};

$("#beneficiaryModalFooter").on("click", "#addBeneficiaryBtn", addBeneficiary);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var beneficiaryIdClicked;
const updateBeneficiary = async (event) => {
  event.preventDefault();
  const name = $("#beneficiaryName").val().trim();
  const address = $("#beneficiaryAddress").val();
  // Call this Backend Route with this method
  const response = await fetch(`/api/beneficiary/${beneficiaryIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({ name, address }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  location.reload();
};
$("#beneficiaryModalFooter").on("click", "#updateBeneficiaryBtn", updateBeneficiary);

// Functions to switch Add or Update Modal
const beneficiaryModalToUpdate = (event) => {
  // We need to get the target beneficiary id for update with this click
  let targetclicked = $(event.target);
  beneficiaryObjClicked = JSON.parse(targetclicked.attr("data"));
  beneficiaryIdClicked = beneficiaryObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#beneficiaryName").val(beneficiaryObjClicked.name);
  $("#beneficiaryAddress").val(beneficiaryObjClicked.address);
  // Switch to Update Modal
  $("#beneficiaryModalTitle").text("Update Beneficiary");
  $("#beneficiaryModalFooter")
    .children(0)
    .attr("id", "updateBeneficiaryBtn")
    .text("Update");
};

const beneficiaryModalToAdd = () => {
  // Clear out previous autocomplete
  $("#beneficiaryName").val('');
  $("#beneficiaryAddress").val('');
  // Switch to Add Modal
  $("#beneficiaryModalTitle").text("Add Beneficiary");
  $("#beneficiaryModalFooter").children(0).attr("id", "addBeneficiaryBtn").text("Add");
};

$(".beneficiaryBtn").on("click", beneficiaryModalToUpdate);
$("#launchBeneficiary").on("click", beneficiaryModalToAdd);

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Executor relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 
// %%%%%%%%%%%%%%%%%% Delete Handler %%%%%%%%%%%%%%%%%%
const deleteExecutor = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let executorOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/executor/${executorOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    $(event.target).parent().remove();
  }
};

$(".executorDelete").on("click", deleteExecutor);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addExecutor = async (event) => {
  event.preventDefault();
  const name = $("#executorName").val().trim();
  const address = $("#executorAddress").val();
  const isAlternate = $("#executorIsAlternate").val();
  let hasBoolean;
  if ( isAlternate == "true" || isAlternate == "false" ){ hasBoolean = true } else { hasBoolean = false };
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if ( name && address && hasBoolean ) {
    const response = await fetch(`/api/executor`, {
      method: "POST",
      body: JSON.stringify({ name, address, isAlternate }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add");
    }
    location.reload();
  }
};

$("#executorModalFooter").on("click", "#addExecutorBtn", addExecutor);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var executorIdClicked;
const updateExecutor = async (event) => {
  event.preventDefault();
  const name = $("#executorName").val().trim();
  const address = $("#executorAddress").val();
  const isAlternate = $("#executorIsAlternate").val();
  // Call this Backend Route with this method
  const response = await fetch(`/api/executor/${executorIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({ name, address, isAlternate }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  location.reload();
};
$("#executorModalFooter").on("click", "#updateExecutorBtn", updateExecutor);

// Functions to switch Add or Update Modal
const executorModalToUpdate = (event) => {
  // We need to get the target executor id for update with this click
  let targetclicked = $(event.target);
  executorObjClicked = JSON.parse(targetclicked.attr("data"));
  executorIdClicked = executorObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#executorName").val(executorObjClicked.name);
  $("#executorAddress").val(executorObjClicked.address);
  $("#executorIsAlternate").val(executorObjClicked.isAlternate);
  // Switch to Update Modal
  $("#executorModalTitle").text("Update Executor");
  $("#executorModalFooter")
    .children(0)
    .attr("id", "updateExecutorBtn")
    .text("Update");
};

const executorModalToAdd = () => {
  // Clear out previous autocomplete
  $("#executorName").val('');
  $("#executorAddress").val('');
  $("#executorIsAlternate").val('');
  // Switch to Add Modal
  $("#executorModalTitle").text("Add Executor");
  $("#executorModalFooter").children(0).attr("id", "addExecutorBtn").text("Add");
};

$(".executorBtn").on("click", executorModalToUpdate);
$("#launchExecutor").on("click", executorModalToAdd);

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Asset relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// %%%%%%%%%%%%%%%%%% Delete Handler %%%%%%%%%%%%%%%%%%
const deleteAsset = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let assetOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/asset/${assetOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    $(event.target).parent().remove();
  }
};

$(".assetDelete").on("click", deleteAsset);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addAsset = async (event) => {
  event.preventDefault();
  const description = $("#assetDescription").val().trim();
  const type = $("#assetType").val();
  const value = $("#assetValue").val();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if ( description && type && value ) {
    const response = await fetch(`/api/asset`, {
      method: "POST",
      body: JSON.stringify({ description, type, value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add");
    }
    location.reload();
  }
};

$("#assetModalFooter").on("click", "#addAssetBtn", addAsset);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var assetIdClicked;
const updateAsset = async (event) => {
  event.preventDefault();
  const description = $("#assetDescription").val().trim();
  const type = $("#assetType").val();
  const value = $("#assetValue").val();
  // Call this Backend Route with this method
  const response = await fetch(`/api/asset/${assetIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({ description, type, value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  location.reload();
};
$("#assetModalFooter").on("click", "#updateAssetBtn", updateAsset);

// Functions to switch Add or Update Modal
const assetModalToUpdate = (event) => {
  // We need to get the target asset id for update with this click
  let targetclicked = $(event.target);
  assetObjClicked = JSON.parse(targetclicked.attr("data"));
  assetIdClicked = assetObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#assetDescription").val(assetObjClicked.description);
  $("#assetType").val(assetObjClicked.type);
  $("#assetValue").val(assetObjClicked.value);
  // Switch to Update Modal
  $("#assetModalTitle").text("Update Asset");
  $("#assetModalFooter")
    .children(0)
    .attr("id", "updateAssetBtn")
    .text("Update");
};

const assetModalToAdd = () => {
  // Clear out previous autocomplete
  $("#assetDescription").val('');
  $("#assetType").val('');
  $("#assetValue").val('');
  // Switch to Add Modal
  $("#assetModalTitle").text("Add Asset");
  $("#assetModalFooter").children(0).attr("id", "addAssetBtn").text("Add");
};

$(".assetBtn").on("click", assetModalToUpdate);
$("#launchAsset").on("click", assetModalToAdd);

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Witness relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// %%%%%%%%%%%%%%%%%% Delete Handler %%%%%%%%%%%%%%%%%%
const deleteWitness = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let witnessOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/witness/${witnessOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    $(event.target).parent().remove();
  }
};

$(".witnessDelete").on("click", deleteWitness);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addWitness = async (event) => {
  event.preventDefault();
  const name = $("#witnessName").val().trim();
  const relationship = $("#witnessRelation").val();
  const address = $("#witnessAddress").val().trim();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if ( name && address ) {
    const response = await fetch(`/api/witness`, {
      method: "POST",
      body: JSON.stringify({ name, relationship, address }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add");
    }
    location.reload();
  }
};

$("#witnessModalFooter").on("click", "#addWitnessBtn", addWitness);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var witnessIdClicked;
const updateWitness = async (event) => {
  event.preventDefault();
  const name = $("#witnessName").val().trim();
  const relationship = $("#witnessRelation").val();
  const address = $("#witnessAddress").val().trim();
  // Call this Backend Route with this method
  const response = await fetch(`/api/witness/${witnessIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({ name, relationship, address }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  location.reload();
};

$("#witnessModalFooter").on("click", "#updateWitnessBtn", updateWitness);

// Functions to switch Add or Update Modal
const witnessModalToUpdate = (event) => {
  // We need to get the target witness id for update with this click
  let targetclicked = $(event.target);
  witnessObjClicked = JSON.parse(targetclicked.attr("data"));
  witnessIdClicked = witnessObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#witnessName").val(witnessObjClicked.name);
  $("#witnessRelation").val(witnessObjClicked.relationship);
  $("#witnessAddress").val(witnessObjClicked.address);
  // Switch to Update Modal
  $("#witnessModalTitle").text("Update Witness");
  $("#witnessModalFooter")
    .children(0)
    .attr("id", "updateWitnessBtn")
    .text("Update");
};

const witnessModalToAdd = () => {
  // Clear out previous autocomplete
  $("#witnessName").val('');
  $("#witnessRelation").val('');
  $("#witnessAddress").val('');
  // Switch to Add Modal
  $("#witnessModalTitle").text("Add Witness");
  $("#witnessModalFooter").children(0).attr("id", "addWitnessBtn").text("Add");
};

$(".witnessBtn").on("click", witnessModalToUpdate);
$("#launchWitness").on("click", witnessModalToAdd);
