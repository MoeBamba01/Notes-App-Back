const express = require ("express");
const router = express.Router();
const { authenticateToken } = require("../utilities");
const noteController = require("../controllers/noteController");


router.post ("/add-note", authenticateToken,  noteController.newNote);
router.put ("/edit-note/:noteId", authenticateToken, noteController.editNote);
router.put("/update-note-pinned/:noteId", authenticateToken, noteController.editPin);
router.get("/get-all-notes/", authenticateToken, noteController.getNotes);
router.delete("/delete-note/:noteId", authenticateToken, noteController.deleteNote);
router.get("/search-notes", authenticateToken, noteController.searchNote);

module.exports = router;

