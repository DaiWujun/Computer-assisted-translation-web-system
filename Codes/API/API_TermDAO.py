from flask import Flask, jsonify, request
from TermLibraryDAO import TermLibraryDAO

app = Flask(__name__)


@app.route('/terms', methods=['POST'])

def add_term():
    data = request.get_json()
    term = data.get('term')
    definition = data.get('definition', '')
    context = data.get('context', '')
    source = data.get('source', '')
    category = data.get('category', '')

    try:
        TermLibraryDAO.add_term(term, definition, context, source, category)
        return jsonify({'message': 'Term added successfully.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/terms', methods=['GET'])

def search_terms():
    term = request.args.get('term')
    category = request.args.get('category')

    if term:
        results = TermLibraryDAO.search_by_term(term)
    elif category:
        results = TermLibraryDAO.search_by_category(category)
    else:
        return jsonify({'message': 'Missing search term or category.'}), 400

    return jsonify(results), 200


@app.route('/terms/<term_id>', methods=['PUT'])

def update_term(term_id):
    data = request.get_json()
    term = data.get('term')
    definition = data.get('definition', '')
    context = data.get('context', '')
    source = data.get('source', '')
    category = data.get('category', '')

    try:
        TermLibraryDAO.update_term(term_id, term, definition, context, source, category)
        return jsonify({'message': 'Term updated successfully.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/terms/<term_id>', methods=['DELETE'])

def delete_term(term_id):
    try:
        TermLibraryDAO.delete_term(term_id)
        return jsonify({'message': 'Term deleted successfully.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/terms/export', methods=['GET'])

def export_backup():
    backup_file = request.args.get('backup_file')

    if not backup_file:
        return jsonify({'message': 'Missing backup file path.'}), 400

    try:
        TermLibraryDAO.export_backup_term(backup_file)
        return jsonify({'message': 'Backup exported successfully.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/terms/<term>', methods=['GET'])

def get_term_id(term):
    try:
        term_id = TermLibraryDAO.get_id_by_term(term)
        return jsonify({'term_id': term_id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run()
