export function SelectInstitution({ institutionId, institutionInfo, handleInstitutionSelection }) {
    return (<>          
        <select value={institutionId} onChange={handleInstitutionSelection} name="institutionOptions">
          {institutionInfo.map((info) => (
            <option value={info.key} key={info.key}>
              {info.value}
            </option>
          ))}
        </select>
  </>)
}