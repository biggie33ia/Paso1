// src/components/AlumnoP.jsx
import React, { useState } from "react";

const documentosIniciales = {
  actaCompromiso: null,
  documentoIdentidad: null,
  soporteAcademico: null,
  tipoAcademico: "",
  certificadoSalud: null,
  certificadoIcfes: null,
  tutoriaLegal: null,
};

const documentosEtapa = {
  gfpiF023: null,
  certificadoEmpresa: null,
  bitacoras: null,
  carnetDestruido: null,
  pazYSalvo: null,
  certificadoAgencia: null,
  documentoIdentidadVigente: null,
  resultadosTyt: null,
  juiciosEvaluativos: null,
};

export default function AlumnoP() {
  const [documentos, setDocumentos] = useState(documentosIniciales);
  const [documentosProductiva, setDocumentosProductiva] = useState(documentosEtapa);
  const [mostrarEtapaProductiva, setMostrarEtapaProductiva] = useState(false);

  const handleFileChange = (e, campo, etapa = false) => {
    const file = e.target.files[0];
    if (etapa) {
      setDocumentosProductiva({ ...documentosProductiva, [campo]: file });
    } else {
      setDocumentos({ ...documentos, [campo]: file });
    }
  };

  const handleTipoAcademicoChange = (e) => {
    setDocumentos({ ...documentos, tipoAcademico: e.target.value });
  };

  const verificarFaltantes = (docs, tipo = "iniciales") => {
    const faltantes = [];
    for (let campo in docs) {
      if (!docs[campo] && campo !== "tipoAcademico") {
        faltantes.push(campo);
      }
    }
    alert(
      faltantes.length === 0
        ? `Todos los documentos ${tipo} han sido cargados.`
        : `Faltan por cargar (${tipo}): ${faltantes.join(", ").replace(/([A-Z])/g, " $1")}`
    );
  };

  // Vista inicial
  if (!mostrarEtapaProductiva) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Panel del Aprendiz</h2>

        <div>
          <label>Acta de compromiso: </label>
          <input type="file" onChange={(e) => handleFileChange(e, "actaCompromiso")} />
        </div>

        <div>
          <label>Documento de identidad: </label>
          <input type="file" onChange={(e) => handleFileChange(e, "documentoIdentidad")} />
        </div>

        <div>
          <label>Soporte académico: </label>
          <input type="file" onChange={(e) => handleFileChange(e, "soporteAcademico")} />
          <div>
            <label>Tipo: </label>
            <select onChange={handleTipoAcademicoChange} value={documentos.tipoAcademico}>
              <option value="">Seleccione</option>
              <option value="tecnico">Técnico</option>
              <option value="operario">Operario</option>
              <option value="tecnologo">Tecnólogo</option>
            </select>
          </div>
        </div>

        <div>
          <label>Certificado de Salud: </label>
          <input type="file" onChange={(e) => handleFileChange(e, "certificadoSalud")} />
        </div>

        <div>
          <label>Certificado ICFES: </label>
          <input type="file" onChange={(e) => handleFileChange(e, "certificadoIcfes")} />
        </div>

        <div>
          <label>Tutoría Legal (si aplica): </label>
          <input type="file" onChange={(e) => handleFileChange(e, "tutoriaLegal")} />
        </div>

        <br />

        <button onClick={() => verificarFaltantes(documentos, "iniciales")}>
          Verificar documentos faltantes
        </button>
        <br /><br />

        <button onClick={() => setMostrarEtapaProductiva(true)}>Ir a Etapa Productiva</button>
      </div>
    );
  }

  // Vista Etapa Productiva
  return (
    <div style={{ padding: "20px" }}>
      <h2>Documentos - Etapa Productiva</h2>

      <div>
        <label>GFPI-F-023 Etapa Productiva: </label>
        <input type="file" onChange={(e) => handleFileChange(e, "gfpiF023", true)} />
      </div>

      <div>
        <label>Certificado empresa etapa práctica: </label>
        <input type="file" onChange={(e) => handleFileChange(e, "certificadoEmpresa", true)} />
      </div>

      <div>
        <label>Bitácoras: </label>
        <input type="file" onChange={(e) => handleFileChange(e, "bitacoras", true)} />
      </div>

      <div>
        <label>Carnet destruido: </label>
        <input type="file" onChange={(e) => handleFileChange(e, "carnetDestruido", true)} />
      </div>

      <div>
        <label>Paz y salvo: </label>
        <input type="file" onChange={(e) => handleFileChange(e, "pazYSalvo", true)} />
      </div>

      <div>
        <label>Certificado Agencia Pública de Empleo: </label>
        <input type="file" onChange={(e) => handleFileChange(e, "certificadoAgencia", true)} />
      </div>

      <div>
        <label>Documento de Identidad Vigente: </label>
        <input type="file" onChange={(e) => handleFileChange(e, "documentoIdentidadVigente", true)} />
      </div>

      <div>
        <label>Resultados pruebas TYT (solo Tecnólogos): </label>
        <input type="file" onChange={(e) => handleFileChange(e, "resultadosTyt", true)} />
      </div>

      <div>
        <label>Juicios Evaluativos: </label>
        <input type="file" onChange={(e) => handleFileChange(e, "juiciosEvaluativos", true)} />
      </div>

      <br />

      <button onClick={() => verificarFaltantes(documentosProductiva, "de etapa productiva")}>
        Verificar documentos faltantes
      </button>
      <br /><br />

      <button onClick={() => setMostrarEtapaProductiva(false)}>Volver</button>
    </div>
  );
}
