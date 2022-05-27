import {
  IonButton,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { createOutline } from "ionicons/icons";

export function Tasks(props) {
  const { text, done, changing } = props;

  return (
    <IonItem className={`task ${done ? "done" : ""}`}>
      <IonCheckbox
        slot="start"
        checked={done}
        onIonChange={() => changing({ done: !done })}
      />
      <IonLabel onClick={() => changing({ done: !done })}>{text}</IonLabel>
      <EditButton
        onUpdate={(newValue) => changing({ text: newValue })}
        value={text}
      />
    </IonItem>
  );
}

function EditButton(props) {
  const { updating, value } = props;
  const [isEditing, setEditing] = useState(false);

  return (
    <>
      <IonButton fill="clear" onClick={() => setEditing(true)}>
        <IonIcon slot="icon-only" icon={createOutline} />
      </IonButton>

      <IonAlert
        isOpen={isEditing}
        onWillDismiss={() => setEditing(false)}
        header={"Modification"}
        inputs={[
          {
            type: "text", name: "text", value: value,
          },
        ]}
        buttons={[
          "Annuler",
          {
            text: "Modifier",
            handler: (values) => updating(values.text),
          },
        ]}
      />
    </>
  );
}

