import { matchedData } from "express-validator";
import { ReportModel } from "../models/report.model.js";

export const createReport = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const newReport = await ReportModel.create({
      title: data.title,
      content: data.content,
      author: data.author,
      team: data.team,
    });

    return res.status(201).json({ ok: true, newReport });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getAllReports = async (req, res) => {
  try {
    const reports = await ReportModel.find()
      .populate("author", "username email")
      .populate("team", "name");
    return res.status(200).json({ ok: true, reports });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const getByIdReport = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await ReportModel.findById(id)
      .populate("author", "username email")
      .populate("team", "name");
    return res.status(200).json({ ok: true, report });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const updateReport = async (req, res) => {
  const { id } = req.params;
  try {
    const data = matchedData(req, { locations: ["body"] });

    const updateReport = await ReportModel.findByIdAndUpdate(
      id,
      { title: data.title, content: data.content, status: data.status },
      {
        new: true,
      }
    );
    return res.status(200).json({ ok: true, updateReport });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
export const deletedReport = async (req, res) => {
  const { id } = req.params;
  try {
    const reportDeleted = await ReportModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ ok: true, msg: "Reporte eliminado", reportDeleted });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno del servidor" });
  }
};
