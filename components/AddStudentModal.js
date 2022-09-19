/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* Copyright (c) 2021 Oliver Ni */

import {
  Alert,
  AlertIcon,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import FormField from "~/components/FormField";

const AddStudentModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  error,
  customFields,
  title,
  allowEditEmail = true,
  defaultValues,
}) => {
  const schema = useMemo(
    () =>
      yup.object({
        fname: yup.string().required().label("First Name"),
        lname: yup.string().required().label("Last Name"),
        email: yup.string().email().required().label("Email Address"),
        grade: yup.number().typeError("Invalid number").required().label("Grade"),
        ...Object.fromEntries(
          customFields.map((v) => {
            let field = yup.string().label(v.label);
            if (v.required) field = field.required();
            if (v.choices) field = field.oneOf(v.choices);
            return [v.id, field];
          })
        ),
      }),
    [customFields]
  );

  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const ref = useRef();

  return (
    <Modal isOpen={isOpen} initialFocusRef={ref} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title ?? "Invite Student"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form id="add-student" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error.message}
                </Alert>
              )}

              <FormField
                ref={(e) => {
                  register(e);
                  ref.current = e;
                }}
                name="fname"
                label="First Name"
                placeholder="Blaise"
                error={errors.fname}
                isRequired
              />

              <FormField
                ref={register}
                name="lname"
                label="Last Name"
                placeholder="Pascal"
                error={errors.lname}
                isRequired
              />

              <FormField
                ref={register}
                type="email"
                name="email"
                label="Email Address"
                placeholder="blaise.pascal@gmail.com"
                error={errors.email}
                isDisabled={!allowEditEmail}
                isRequired
              />

              <FormField ref={register} name="grade" label="Grade" placeholder="10" error={errors.grade} isRequired />

              {customFields.map((x) => (
                <FormField
                  key={x.id}
                  ref={register}
                  name={x.id}
                  label={x.label}
                  error={errors[x.id]}
                  isRequired={x.required}
                  as={x.choices ? Select : undefined}
                >
                  {x.choices &&
                    x.choices.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                </FormField>
              ))}
            </Stack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="add-student" colorScheme="blue" mr={3} isLoading={isLoading}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddStudentModal;
