{@link GenericMapperUtils GenericMapperUtils}

### Usage
[GenericMapperUtils.mapObject]{@link GenericMapperUtils#mapObject}


##### Design

tl;dr: Design is based on AutoMapper library ({@link http://automapper.org/}), but inverted.

Whereas AutoMapper uses the destination object to infere the shape of the source, we use the source object o infere the shape of our destination object.  At it's most basic, the mapper will transform the source properties to the destination object, using the supplied keyCase strategy to generate the new key.  Extention points are given at the relevant places, supplied within the optional schema.

The schema object allows you to supply targetted behaviours to given properties, this currently includes overriding the key value, exploding objects into many properties, overriding the value.

At this time, this class is not complete, so it can't really be used to replace the entire MappingUtils class.  In order to make this possible, there are a few features still outstanding:

- Array value support. There is no support for propeties that are arrays.
- Collapsing arrays into one or more properties

The internal architecture is based on the strategy pattern.  Moving parts are supplied within collections, that contain predicates to allow for strategy selection.  The primary logic within the tool can be found in the forEach loop.

This code is the primary controller, there is a lot of room for improvement here. A better option may be to close the schema, and add what is missing to with calls to the key and value builders, and then execute the mapping using that.  This may reduce some of the checks to ensure we have a schema, as we will always have one.  We may also be able to reduce the branching within the forEach loop.

Constructing a schema that is operated on would also open the option to cache the schema, reducing the need to rebuild it once it has been constructed. Taken further, we could create a schema constrction class, that would centralize all schema creation, and removing the need for [lines like LOC 29]{@link http://localhost:8080/utils_SessionApiUtils.js.html#line29} within {@link SessionApiUtils}

The decision for most external interfaces to return functions is due to functions allowing for the most extensibile options, as its the easiest interface to allow for generalisations and gives use the flexibility to reuse the the same patterns for different functionality, and reduce overall complexity.

