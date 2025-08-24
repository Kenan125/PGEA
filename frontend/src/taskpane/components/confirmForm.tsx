import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Tree,
  TreeItem,
  TreeItemLayout,
} from "@fluentui/react-components";
import React, { lazy, Suspense, useEffect, useState } from "react";

import { format } from "date-fns";
const LazyLoad = lazy(() => import('./lazyload'));
const ConfirmForm = ({ formik }) => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open Alert dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Alert dialog title</DialogTitle>
          <DialogContent>
            <Tree aria-label="Default">
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <strong>Karakter: </strong> {formik.values.Encoding}
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <strong>Mesajınız: </strong> {formik.values.messageInput}
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <strong>Gönderme yöntemi: </strong> {formik.values.sendMethod}
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <strong>Son gönderme: </strong> {formik.values.isLastSendDate ? "var" : "yok"}
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <strong>Gönderme tarihi: </strong> {formik.values.sendDate}
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="branch">
                <TreeItemLayout>Alıcılar</TreeItemLayout>
                <Tree>
                  <Suspense>
                    <LazyLoad formik={formik} />
                  </Suspense>
                </Tree>
              </TreeItem>
              {formik.values.sendMethod === "Parçalı Gönder" &&(
                <><TreeItem itemType="branch">
                  <TreeItemLayout>Parçalı Gönderim</TreeItemLayout>
                  <Tree>       
                <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <strong>Parçalar Arası Süre: </strong> {formik.values.intervalMinutes}
                </TreeItemLayout>
              </TreeItem>
                <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <strong>Her Bölümdeki Mesaj Sayısı: </strong> {formik.values.batchSize}
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <strong>Başlangıç: </strong> {formik.values.timeWindowStart}
                </TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>
                  <strong>Bitiş: </strong> {formik.values.timeWindowEnd}
                </TreeItemLayout>
              </TreeItem>
              </Tree>
              </TreeItem>
                </>
                

              )}
            </Tree>

            {Object.entries(formik.values).map(([field, value]) => (
              <p key={field}>
                <strong>{field}:</strong> {String(value)}
              </p>
            ))}
          </DialogContent>
          <DialogActions>
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ConfirmForm;
