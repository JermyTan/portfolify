import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Label, StrictButtonProps } from "semantic-ui-react";
import { toast } from "react-toastify";
import ImageUploadCropper from "../image-upload-cropper";
import { parseDataUrlToEncodedData } from "../../utils/parser";

export type FormFieldProps = {
  // <image name>:<base64 encoding>
  encodedImageData?: string;
  title?: string;
  content?: string;
};

type Props = {
  onSubmit?: (data: FormFieldProps) => void;
  onCancel?: (data: FormFieldProps) => void;
  defaultValues?: FormFieldProps;
  defaultImage?: string;
  submitButtonProps: { content: string; color: StrictButtonProps["color"] };
};

function PostForm({
  onSubmit,
  onCancel,
  defaultValues,
  defaultImage,
  submitButtonProps,
}: Props) {
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue,
  } = useForm({
    defaultValues,
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const { title: titleError, content: contentError } = errors;

  const _onSubmit = async () => {
    setSubmitting(true);

    try {
      await onSubmit?.({
        encodedImageData: getValues("encodedImageData"),
        title: getValues("title"),
        content: getValues("content"),
      });
      reset();
    } catch (error) {
      console.log(error, error?.response);
      toast.error("An unkown error has occurred.");
    }

    setSubmitting(false);
  };

  const _onCancel = () => {
    onCancel?.({
      encodedImageData: getValues("encodedImageData"),
      title: getValues("title"),
      content: getValues("content"),
    });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(_onSubmit)}>
      <Form.Field>
        <ImageUploadCropper
          defaultImage={defaultImage}
          onFinalizeImage={(imageData) => {
            const { name, data } = imageData;
            setValue(
              "encodedImageData",
              [name, parseDataUrlToEncodedData(data)].join(":")
            );
          }}
          onUnfinalizeImage={() => setValue("encodedImageData", undefined)}
        />
      </Form.Field>

      <input name="encodedImageData" ref={register} hidden />
      <Form.Field required error={!!titleError}>
        <label>Title</label>
        {titleError && (
          <Label
            basic
            color="red"
            content={
              titleError?.type === "required"
                ? "Please enter a title"
                : "Max title length is 100 characters"
            }
            pointing="below"
          />
        )}
        <input
          name="title"
          ref={register({ required: true, maxLength: 100 })}
        />
      </Form.Field>
      <Form.Field required error={!!contentError}>
        <label>Content</label>
        {contentError && (
          <Label
            basic
            color="red"
            content="Please enter content"
            pointing="below"
          />
        )}
        <textarea name="content" rows={10} ref={register({ required: true })} />
      </Form.Field>

      <Form.Group className="action-button-group justify-end">
        <Form.Button
          type="button"
          content="Cancel"
          secondary
          onClick={_onCancel}
        />
        <Form.Button
          type="submit"
          loading={isSubmitting}
          {...submitButtonProps}
        />
      </Form.Group>
    </Form>
  );
}

export default PostForm;
