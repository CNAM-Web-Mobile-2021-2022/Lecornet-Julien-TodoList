import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonLabel,
  IonItem,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonFooter,
  IonInput,
  IonBadge,
} from "@ionic/react";
import React, { useState } from "react";
import { UpdateTask } from "./Updates";
import { Tasks } from "./Tasks.jsx";
import "./TodoList.css";

export function TodoList() {
  const [newTask, setNewTask] = useState("");
  const { list, addTask, updateTask } = UpdateTask();
  const [filter, setFilter] = useState("all");
  const remainingTasks = list.filter((item) => !item.done).length;
  const view = getFilteredList(list, filter);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSegment
            onIonChange={(e) => {
              setFilter(e.detail.value);
            }}value={filter}
          >
            <IonSegmentButton value="remain">
              <IonLabel className="segment-button-with-badge">
                À faire
                {remainingTasks ? (
                  <IonBadge>{remainingTasks}</IonBadge>
                ) : null}
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="all">
              <IonLabel>Tout</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {!remainingTasks && (
            <IonItem>
              <small>Votre liste est vide, bravo !</small>
            </IonItem>
          )}
          {view.map((todoItem) => {
            return (
              <Tasks
                key={todoItem.id}
                text={todoItem.text}
                done={todoItem.done}
                onChange={(overrides) => updateTask(todoItem.id, overrides)}
              />
            );
          })}
        </IonList>
      </IonContent>

      <IonFooter>
        <form
          onSubmit={(event) => {
            if (newTask?.trim()) {
              addTask(newTask);
            }
            setNewTask("");
            event.preventDefault();
          }}
        >
          <IonItem>
            <IonInput
              value={newTask}
              onInput={(event) => setNewTask(event.target.value)}
              placeholder="Qu'avez-vous en tête ?"
              clearInput
            />
            <IonButton type="submit" disabled={!newTask}>
              Créer
            </IonButton>
          </IonItem>
        </form>
      </IonFooter>
    </IonPage>
  );
}

function getFilteredList(list, filterMode) {
  if (filterMode === "remain") {
    return list.filter((item) => !item.done);
  }

  if (filterMode === "done") {
    return list.filter((item) => item.done);
  }

  return list;
}
