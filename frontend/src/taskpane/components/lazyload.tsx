import { TreeItem, TreeItemLayout } from '@fluentui/react-components'
import React, { useEffect, useState } from 'react'
import { replacePlaceholders } from '../utils/replacePlaceholders'
import { format } from 'date-fns';

const Lazyload = ({formik}) => {
  const [date, setDate] = useState<string>("");
    useEffect(() => {
      setInterval(() => setDate(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")), 1000);
    }, []);
  return (
    <>
    {formik.values.recipients.map((recipient, index) => (
                        <TreeItem key={index} itemType="branch">
                          <TreeItemLayout>{recipient.phoneNumber}</TreeItemLayout>
                          <TreeItem itemType="leaf">
                            <TreeItemLayout>
                              📅
                              {formik.values.sendMethod === "Hemen Gönder" ? date : formik.values.sendDate}
                            </TreeItemLayout>
                          </TreeItem>
                          <TreeItem itemType="leaf">
                            <TreeItemLayout>
                              💬<strong>Mesaj: </strong>
                              {formik.values.messageInput
                                ? replacePlaceholders(
                                    formik.values.messageInput,
                                    formik.values.recipients[index]
                                  )
                                : "Boş Mesaj"}
                            </TreeItemLayout>
                          </TreeItem>
                        </TreeItem>
                      ))}
    </>
    
  )
}

export default Lazyload